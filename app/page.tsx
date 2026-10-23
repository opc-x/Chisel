import { getJobs } from "@/lib/actions/jobs";
import { getProfile } from "@/lib/actions/profile";
import JobCard from "@/components/jobs/JobCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

const DEMO_JOBS = [
  {
    id: "demo-stripe-ledger",
    title: "Senior Backend Engineer — Global Payouts & Ledger (Java)",
    company: "Stripe · Remote (Global)",
    location: "Remote",
    salary: "$185k – $230k",
    channel: "Direct Radar",
    score: 96,
    status: "interview",
  },
  {
    id: "demo-airwallex-wallet",
    title: "Staff Java Engineer — Multi-Currency Wallet Core",
    company: "Airwallex · Remote (APAC / SG)",
    location: "Remote (SG)",
    salary: "$160k – $195k",
    channel: "LinkedIn",
    score: 94,
    status: "applied",
  },
  {
    id: "demo-circle-settlement",
    title: "Senior Distributed Systems Engineer — Stablecoin Settlement",
    company: "Circle · Remote (US / APAC)",
    location: "Remote",
    salary: "$175k – $210k",
    channel: "Web3.career",
    score: 91,
    status: "applied",
  },
  {
    id: "demo-wise-recon",
    title: "Senior Java Backend Engineer — Payment Rails & Reconciliation",
    company: "Wise · Remote",
    location: "Remote",
    salary: "$155k – $185k",
    channel: "RemoteOK",
    score: 89,
    status: "viewed",
  },
  {
    id: "demo-kraken-custody",
    title: "Senior Backend Engineer — On-Chain Indexer & Wallet Custody",
    company: "Kraken · Remote",
    location: "Remote",
    salary: "$165k – $200k",
    channel: "CryptoJobsList",
    score: 86,
    status: "new",
  },
  {
    id: "demo-adyen-core",
    title: "Senior Java Engineer — Core Acquiring & Idempotency Engine",
    company: "Adyen · Remote",
    location: "Remote",
    salary: "$150k – $180k",
    channel: "BuiltIn",
    score: 83,
    status: "new",
  },
];

export default async function HomePage() {
  const [dbJobs, profile] = await Promise.all([getJobs(), getProfile()]);
  const jobs = dbJobs.length > 0 ? dbJobs : DEMO_JOBS;

  const topJobs = jobs.filter((j) => (j.score ?? 0) >= 85).slice(0, 5);
  const recentJobs = jobs.slice(0, 10);

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">JobSniper</h1>
          <p className="text-sm text-gray-500">
            {profile?.targetTitle ? `目标：${profile.targetTitle}` : "目标：Senior Java Backend · Global Remote (Payments & Wallets)"}
          </p>
        </div>
        <Link
          href="/profile"
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          我的画像
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "总职位", value: jobs.length },
          { label: "高匹配 (≥85)", value: topJobs.length },
          { label: "跟进中", value: jobs.filter((j) => j.status === "applied" || j.status === "interview").length },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {topJobs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">🎯 高匹配职位</h2>
            <Link href="/jobs?filter=top" className="text-xs text-blue-600">
              查看全部
            </Link>
          </div>
          <div className="space-y-2">
            {topJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">最新雷达入库</h2>
          <Link href="/jobs" className="text-xs text-blue-600">
            查看全部
          </Link>
        </div>
        <div className="space-y-2">
          {recentJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
