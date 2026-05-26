#!/usr/bin/env python3
"""
FDE 岗位采集脚本
通过搜索 API / 网页抓取采集 FDE 相关岗位，更新 static/data/jobs.json

使用方式:
  python scripts/collect_jobs.py          # 本地运行
  或通过 Claude Code skill: /job-collector
"""

import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import quote

# ========== 配置 ==========

JOBS_FILE = Path(__file__).parent.parent / "static" / "data" / "jobs.json"

CATEGORIES = [
    {
        "name": "大模型推理/部署",
        "keywords": ["大模型推理", "LLM推理", "vLLM", "TRT-LLM", "SGLang", "KV Cache", "模型部署", "GPU优化"],
    },
    {
        "name": "大模型应用/Agent",
        "keywords": ["AI Agent", "LLM应用", "RAG", "Prompt Engineering", "LangChain", "Function Calling"],
    },
    {
        "name": "大模型算法/架构",
        "keywords": ["大模型算法", "LLM架构", "模型训练", "MoE", "多模态", "具身智能"],
    },
    {
        "name": "AI 平台/基础设施",
        "keywords": ["AI平台", "CUDA", "GPU工程师", "推理加速", "AI基础设施"],
    },
    {
        "name": "AI 解决方案/架构",
        "keywords": ["AI解决方案", "AI架构师", "大模型解决方案"],
    },
    {
        "name": "AI 前沿部署工程师",
        "keywords": ["AI前沿", "AGI", "AI安全", "AI对齐", "AI研究", "AI Scientist"],
    },
]

SEARCH_SOURCES = {
    "zhipin": {
        "name": "BOSS直聘",
        "url_tpl": "https://www.zhipin.com/web/geek/job?query={keyword}",
    },
    "liepin": {
        "name": "猎聘",
        "url_tpl": "https://www.liepin.com/zhaopin/?key={keyword}",
    },
    "zhilian": {
        "name": "智联招聘",
        "url_tpl": "https://sou.zhaopin.com/jobs/searchresult.ashx?jl=%E5%85%A8%E5%9B%BD&kw={keyword}",
    },
}

def load_existing_jobs():
    """加载已有岗位数据，返回 categories 列表和已知 URL 集合"""
    if not JOBS_FILE.exists():
        return [], set()
    with open(JOBS_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    existing_urls = set()
    for cat in data.get("categories", []):
        for job in cat.get("jobs", []):
            if job.get("url"):
                existing_urls.add(job["url"])
    return data.get("categories", []), existing_urls


def search_boss_zhipin(keyword):
    """
    搜索 BOSS 直聘岗位
    由于 BOSS 直聘有反爬机制，这里使用 Google site: 搜索方式
    """
    jobs = []
    search_url = f"https://www.google.com/search?q=site:zhipin.com+{quote(keyword)}&num=10"
    try:
        req = Request(search_url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
        })
        with urlopen(req, timeout=10) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        # 简单解析 Google 搜索结果
        for match in re.finditer(
            r'(https?://[^"<>]*zhipin\.com/job_detail/[^"<>]*)', html
        ):
            url = match.group(1)
            jobs.append({
                "title": f"{keyword}相关岗位",
                "company": "待提取",
                "location": "待提取",
                "url": url,
                "source": "BOSS直聘",
                "tags": [keyword],
            })
    except Exception as e:
        print(f"  BOSS直聘搜索失败: {e}")
    return jobs


def search_liepin(keyword):
    """
    搜索猎聘岗位
    """
    jobs = []
    search_url = f"https://www.google.com/search?q=site:liepin.com+{quote(keyword)}&num=10"
    try:
        req = Request(search_url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
        })
        with urlopen(req, timeout=10) as resp:
            html = resp.read().decode("utf-8", errors="ignore")
        for match in re.finditer(
            r'(https?://[^"<>]*liepin\.com/job/[^"<>]*)', html
        ):
            url = match.group(1)
            jobs.append({
                "title": f"{keyword}相关岗位",
                "company": "待提取",
                "location": "待提取",
                "url": url,
                "source": "猎聘",
                "tags": [keyword],
            })
    except Exception as e:
        print(f"  猎聘搜索失败: {e}")
    return jobs


def collect_for_keyword(keyword, existing_urls):
    """为单个关键词采集岗位"""
    all_jobs = []

    # 1. BOSS 直聘
    zhipin_jobs = search_boss_zhipin(keyword)
    all_jobs.extend(zhipin_jobs)

    # 2. 猎聘
    liepin_jobs = search_liepin(keyword)
    all_jobs.extend(liepin_jobs)

    # 去重
    new_jobs = []
    for job in all_jobs:
        if job["url"] not in existing_urls:
            new_jobs.append(job)
            existing_urls.add(job["url"])

    return new_jobs


def main():
    print("=" * 50)
    print("FDE 岗位采集")
    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 50)

    # 加载已有数据
    existing_categories, known_urls = load_existing_jobs()
    print(f"\n已有岗位 URL 数: {len(known_urls)}")

    # 按类别采集
    new_by_category = {}
    total_new = 0

    for cat_config in CATEGORIES:
        cat_name = cat_config["name"]
        print(f"\n--- 采集: {cat_name} ---")

        new_jobs = []
        # 每个类别用前 3 个关键词搜索
        for kw in cat_config["keywords"][:3]:
            print(f"  搜索: {kw}")
            jobs = collect_for_keyword(kw, known_urls)
            print(f"    新增: {len(jobs)}")
            new_jobs.extend(jobs)

        new_by_category[cat_name] = new_jobs
        total_new += len(new_jobs)

    # 合并数据
    result_categories = []
    for existing_cat in existing_categories:
        cat_name = existing_cat["name"]
        existing_jobs = existing_cat.get("jobs", [])
        new_jobs = new_by_category.get(cat_name, [])

        # 保留老岗位 + 新增
        all_jobs = existing_jobs + new_jobs

        result_categories.append({
            "name": cat_name,
            "jobs": all_jobs,
        })

    # 更新 hot_companies
    all_companies = set()
    for cat in result_categories:
        for job in cat["jobs"]:
            if job.get("company") and job["company"] != "待提取":
                all_companies.add(job["company"])

    all_skills = set()
    for cat_config in CATEGORIES:
        for kw in cat_config["keywords"]:
            all_skills.add(kw)
    all_skills.update([
        "大模型推理", "vLLM", "TRT-LLM", "GPU优化", "量化", "CUDA",
        "Agent", "RAG", "Prompt Engineering", "多模态",
        "分布式部署", "MoE", "KV Cache", "FlashAttention",
        "SGLang", "PagedAttention", "AWQ", "GPTQ",
        "Function Calling", "具身智能",
    ])

    # 计算总岗位数
    total_jobs = sum(len(cat["jobs"]) for cat in result_categories)

    # 写出
    output = {
        "last_updated": datetime.now().strftime("%Y-%m-%d"),
        "total_jobs": total_jobs,
        "categories": result_categories,
        "salary_insights": {
            "note": "薪资数据需要从职位详情页提取，BOSS直聘等需要登录才能查看完整信息",
            "by_level": [
                {"level": "初级 (1-3年)", "range": "20-40K·14-16薪"},
                {"level": "中级 (3-5年)", "range": "30-60K·15-16薪"},
                {"level": "高级 (5-10年)", "range": "40-70K·15-16薪"},
                {"level": "资深/专家", "range": "50-80K·14-20薪"},
            ],
        },
        "hot_companies": sorted(all_companies) if all_companies else [],
        "hot_skills": sorted(all_skills),
    }

    with open(JOBS_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # 输出报告
    print(f"\n{'=' * 50}")
    print("采集完成!")
    print(f"  新增岗位: {total_new}")
    print(f"  总岗位数: {total_jobs}")
    for cat in result_categories:
        print(f"  [{cat['name']}] {len(cat['jobs'])} 个岗位")
    print(f"  输出文件: {JOBS_FILE}")
    print(f"{'=' * 50}")


if __name__ == "__main__":
    main()
