import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  TrendingUp, 
  Coins, 
  Shield, 
  Activity, 
  FileText, 
  Sliders, 
  Cpu, 
  AlertTriangle, 
  Leaf, 
  Calendar, 
  Building2, 
  Users, 
  DollarSign, 
  Calculator, 
  HelpCircle, 
  RefreshCw, 
  Layers, 
  Lock, 
  Flame, 
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

import { PhaseData, SimParameters } from "./types";
import { 
  INITIAL_PHASES, 
  TECHNICAL_SPECS, 
  REGULATORY_WINDFALL_2027, 
  RISK_MANAGEMENT, 
  CALCULATOR_KNOWLEDGE, 
  FAQS, 
  projectPhases 
} from "./data";

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<"deck" | "simulator" | "faq">("deck");
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Roadmap Drill-down State on Slide 3
  const [selectedRoadmapPhase, setSelectedRoadmapPhase] = useState<number>(1);
  
  // Technical interactive carousel on Slide 5
  const [activeTechSpec, setActiveTechSpec] = useState(0);

  // Simulation parameters for dynamic ROI
  const [simParams, setSimParams] = useState<SimParameters>({
    treatmentFee: 3000,   // NT$ / Ton
    proteinPrice: 45000,  // NT$ / Ton
    frassPrice: 15000,    // NT$ / Ton
    capexMultiplier: 1.0,  // Base standard cost
    opexMultiplier: 1.0,   // Base standard opex
  });

  // Calculate dynamic phases based on simulator sliders
  const [projectedData, setProjectedData] = useState<PhaseData[]>(INITIAL_PHASES);
  
  useEffect(() => {
    const updated = projectPhases(simParams);
    setProjectedData(updated);
  }, [simParams]);

  // Frequently Asked Questions Search/Filter
  const [faqSearch, setFaqSearch] = useState("");
  const [faqActiveTag, setFaqActiveTag] = useState<string>("全部");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Time Countdown to 2027 Regulatory Windfall (Jan 1, 2027)
  const [countdownText, setCountdownText] = useState("");
  
  useEffect(() => {
    const targetDate = new Date("2027-01-01T00:00:00").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdownText("2027 年法規革新紅利已正式啟動！全台飼料與廚餘養豬限令防線生效！");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdownText(`${days} 天 ${hours} 小時 ${minutes} 分鐘 ${seconds} 秒`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Slide count
  const slideCount = 8;

  // Slide Keyboard Navigation Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "deck") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, slideCount - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab]);

  const slideProgress = ((currentSlide + 1) / slideCount) * 100;

  // Helper formatting numbers
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(val);
  };

  const formatShortMoney = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)} 百萬`;
    }
    return `${(val / 10000).toFixed(0)} 萬`;
  };

  const handleResetSim = () => {
    setSimParams({
      treatmentFee: 3000,
      proteinPrice: 45000,
      frassPrice: 15000,
      capexMultiplier: 1.0,
      opexMultiplier: 1.0,
    });
  };

  const handleExportReport = () => {
    const currentPhases = projectedData;

    const htmlContent = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>黑水虻綠色精煉廠創投計畫簡報 (Pitch Deck) - 投資計畫書報告</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap');
    
    body {
      font-family: 'Plus Jakarta Sans', 'Noto Sans TC', sans-serif;
      background-color: #0b0f19;
      color: #f8fafc;
      margin: 0;
      padding: 40px;
      line-height: 1.6;
    }
    
    .container {
      max-width: 960px;
      margin: 0 auto;
      background-color: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    
    .header {
      border-bottom: 2px solid #10b981;
      padding-bottom: 24px;
      margin-bottom: 35px;
    }
    
    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .title-badge {
      background-color: rgba(16, 185, 129, 0.1);
      color: #34d399;
      font-size: 11px;
      font-weight: bold;
      padding: 6px 14px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    
    h1 {
      font-size: 36px;
      font-weight: 900;
      color: #ffffff;
      margin: 20px 0 8px 0;
      line-height: 1.25;
      background: linear-gradient(to right, #ffffff, #34d399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .subtitle {
      font-size: 18px;
      color: #94a3b8;
      margin-top: 0;
      margin-bottom: 15px;
    }
    
    .meta-grid {
      display: grid;
      grid-template-cols: repeat(auto-fit, minmax(220px, 1fr));
      gap: 15px;
      font-size: 13.5px;
      color: #94a3b8;
      margin-top: 25px;
      background-color: #020617;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #1e293b;
    }
    
    .meta-item strong {
      color: #34d399;
    }
    
    .section {
      margin-bottom: 45px;
      page-break-inside: avoid;
    }
    
    h2 {
      font-size: 20px;
      font-weight: 800;
      color: #ffffff;
      border-left: 4px solid #10b981;
      padding-left: 12px;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    p {
      font-size: 14.5px;
      color: #cbd5e1;
      line-height: 1.7;
    }
    
    .grid-3 {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    
    @media (max-width: 768px) {
      .grid-3 {
        grid-template-cols: 1fr;
      }
    }
    
    .card {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 20px;
      transition: all 0.2s;
    }
    
    .card-title {
      font-size: 15px;
      font-weight: bold;
      color: #ffffff;
      margin-top: 0;
      margin-bottom: 8px;
    }
    
    .card-num {
      background-color: #10b981;
      color: #020617;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 13px;
      margin-bottom: 12px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      font-size: 13.5px;
      background-color: #020617;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #1e293b;
    }
    
    th, td {
      border: 1px solid #1e293b;
      padding: 12px 16px;
      text-align: left;
    }
    
    th {
      background-color: #0f172a;
      color: #34d399;
      font-weight: 700;
    }
    
    .highlight-row {
      background-color: rgba(16, 185, 129, 0.05);
      font-weight: bold;
    }
    
    .highlight-row td {
      color: #34d399;
    }
    
    .danger-box {
      border-left: 4px solid #f87171;
      background-color: rgba(248, 113, 113, 0.05);
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 15px;
      border-top: 1px solid rgba(248, 113, 113, 0.1);
      border-right: 1px solid rgba(248, 113, 113, 0.1);
      border-bottom: 1px solid rgba(248, 113, 113, 0.1);
    }
    
    .success-box {
      border-left: 4px solid #34d399;
      background-color: rgba(52, 211, 153, 0.05);
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 15px;
      border-top: 1px solid rgba(52, 211, 153, 0.1);
      border-right: 1px solid rgba(52, 211, 153, 0.1);
      border-bottom: 1px solid rgba(52, 211, 153, 0.1);
    }
    
    .print-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: linear-gradient(to right, #10b981, #059669);
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s;
      z-index: 9999;
    }
    
    .print-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(16, 185, 129, 0.4);
    }
    
    ul {
      padding-left: 20px;
      margin: 15px 0;
    }
    
    li {
      margin-bottom: 10px;
      color: #cbd5e1;
      font-size: 14.5px;
    }
    
    li strong {
      color: #34d399;
    }

    /* Print-specific layout optimizing */
    @media print {
      body {
        background-color: #ffffff !important;
        color: #0f172a !important;
        padding: 0;
      }
      .container {
        border: none !important;
        box-shadow: none !important;
        background-color: #ffffff !important;
        color: #0f172a !important;
        padding: 0 !important;
      }
      h1, h2, h3, .card-title {
        color: #0f172a !important;
        -webkit-text-fill-color: initial !important;
      }
      p, li {
        color: #334155 !important;
      }
      .card {
        background-color: #f8fafc !important;
        border: 1px solid #e2e8f0 !important;
      }
      .meta-grid {
        background-color: #f1f5f9 !important;
        border: 1px solid #cbd5e1 !important;
        color: #475569 !important;
      }
      .meta-item strong {
        color: #16a34a !important;
      }
      table {
        background-color: #ffffff !important;
        border: 1px solid #cbd5e1 !important;
      }
      th {
        background-color: #f1f5f9 !important;
        color: #16a34a !important;
        border: 1px solid #cbd5e1 !important;
      }
      td {
        border: 1px solid #cbd5e1 !important;
      }
      .highlight-row {
        background-color: #f0fdf4 !important;
      }
      .highlight-row td {
        color: #16a34a !important;
      }
      .danger-box {
        background-color: #fef2f2 !important;
        border: 1px solid #fca5a5 !important;
      }
      .success-box {
        background-color: #f0fdf4 !important;
        border: 1px solid #86efac !important;
      }
      .print-btn {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <button class="print-btn" onclick="window.print()">
      🖨️ 轉存 PDF / 立即列印
    </button>

    <div class="header">
      <div class="header-top">
        <span class="title-badge">創業投資計劃・保密文件</span>
        <span style="font-size: 12px; color: #94a3b8; font-family: monospace;">REPORT v2.0 - 2027法規轉型卡位</span>
      </div>
      <h1>黑水虻循環經濟與綠色蛋白質精煉廠</h1>
      <p class="subtitle">創業投資計畫簡報 (Pitch Deck) - 完整投資說明與動態財務模擬報告</p>
      
      <div class="meta-grid">
        <div class="meta-item">提案諮詢：<strong>z80705682z@gmail.com</strong></div>
        <div class="meta-item">累計設計 CAPEX：<strong>NT$ 20,000,000</strong></div>
        <div class="meta-item">最高日處理能力 (P3)：<strong>20 公噸 / 日</strong></div>
        <div class="meta-item">報告生成時間：<strong>${new Date().toLocaleString('zh-TW')}</strong></div>
      </div>
    </div>

    <!-- Section 1 -->
    <div class="section">
      <h2>📈 01. 項目核心策略：階段性去風險化藍圖</h2>
      <p>
        本案採取三階段漸進投資，不以盲目擴大為首要。一期首要任務在於去風險化 (De-risking)，以小規模打通所有技術、行政、法規與審查痛點，為後續倍增和全面工業化精煉打下堅固基礎。
      </p>
      <div class="grid-3">
        <div class="card">
          <div class="card-num">1</div>
          <p class="card-title">Phase 1: SOP 建立與首張許可</p>
          <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
            日處理 5 噸。驗證一整套物料配比與高效取食 SOP，並取得首張廚餘再利用合法資質，安全去風險。
          </p>
        </div>
        <div class="card">
          <div class="card-num">2</div>
          <p class="card-title">Phase 2: 產能倍增與渠道變現</p>
          <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
            日處理 10 噸。擴大對接中大型餐飲及團膳 long-term 收費合約，並取得「肥料登記證」增加變現通路。
          </p>
        </div>
        <div class="card">
          <div class="card-num">3</div>
          <p class="card-title">Phase 3: 自動化精煉與規模收益</p>
          <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
            日處理 20 噸。全面自動化及四大垂直立體科技。解鎖 ESG 二氧化碳減碳 300kg/噸的交易紅利。
          </p>
        </div>
      </div>
    </div>

    <!-- Section 2 -->
    <div class="section">
      <h2>🔥 02. 2027 年法規轉型百億紅利大解碼</h2>
      <p>
        由於非洲豬瘟防堵及多元再利用法規演進，全台各縣市推行「廚餘禁止直接養豬」政策。每日超 1,300 噸廚餘流向無門，合法化去化處理廠將迎來長達十年以上的巨大利差壟斷。
      </p>
      <ul>
        <li><strong>B2B 廚餘去化費攀升：</strong> 以住付費給豬農的模式瓦解，連鎖團膳、超商食品加工廠去化壓力劇增，我們在 Phase 1 & 2 的提早佈局，能以極高護城河姿態接管高利潤去化市場。</li>
        <li><strong>ESG 二氧化碳計量價值：</strong> 本項目黑水虻精煉相比傳統掩埋與堆肥，每噸可減少高達 300 公斤 CO₂ 當量。Phase 3 年處理可減碳逾 2,000 噸，完美對接 CBAM 跨境碳交易與綠色金融投融資。</li>
      </ul>
    </div>

    <!-- Section 3: Dynamic tables -->
    <div class="section">
      <h2>📊 03. 動態財務變量模擬沙盒報告</h2>
      <p style="font-size: 13.5px; color: #cbd5e1; font-style: italic;">
        * 本報表數據為基於您在決策沙盒中所調節的主觀變量所進行的精細計算投影：
        <br>
        <strong>設定前端廚餘收有料處理費：${formatMoney(simParams.treatmentFee)} / 公噸</strong>
        <br>
        <strong>後端高檔昆蟲蛋白質賣價：${formatMoney(simParams.proteinPrice)} / 公噸</strong> | 
        <strong>黃金蟲砂肥料賣價：${formatMoney(simParams.frassPrice)} / 公噸</strong>
        <br>
        <strong>CAPEX 建廠支出係數：${(simParams.capexMultiplier * 100).toFixed(0)}%</strong> | 
        <strong>OPEX 耗能營運支出係數：${(simParams.opexMultiplier * 100).toFixed(0)}%</strong>
      </p>
      
      <table>
        <thead>
          <tr>
            <th>指標 / 目標階段</th>
            <th>Phase 1: SOP 打磨</th>
            <th>Phase 2: 產能倍增</th>
            <th>Phase 3: 自動化精煉</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>日處理廚餘量 (Tons/Day)</strong></td>
            <td>5 公噸 / 日</td>
            <td>10 公噸 / 日</td>
            <td>20 公噸 / 日</td>
          </tr>
          <tr>
            <td><strong>累計總 CAPEX 投入</strong></td>
            <td>${formatMoney(currentPhases[0].capex)}</td>
            <td>${formatMoney(currentPhases[1].capex)}</td>
            <td>${formatMoney(currentPhases[2].capex)}</td>
          </tr>
          <tr>
            <td><strong>月度預估總營收</strong></td>
            <td>${formatMoney(currentPhases[0].monthlyRevenue)}</td>
            <td>${formatMoney(currentPhases[1].monthlyRevenue)}</td>
            <td>${formatMoney(currentPhases[2].monthlyRevenue)}</td>
          </tr>
          <tr>
            <td><strong>月度營運成本 (OPEX)</strong></td>
            <td>${formatMoney(currentPhases[0].opex)}</td>
            <td>${formatMoney(currentPhases[1].opex)}</td>
            <td>${formatMoney(currentPhases[2].opex)}</td>
          </tr>
          <tr class="highlight-row">
            <td><strong>預估月純利 (EBITDA)</strong></td>
            <td>${formatMoney(currentPhases[0].ebitda)}</td>
            <td>${formatMoney(currentPhases[1].ebitda)}</td>
            <td>${formatMoney(currentPhases[2].ebitda)}</td>
          </tr>
          <tr class="highlight-row">
            <td><strong>預估年化 EBITDA 利潤</strong></td>
            <td>${formatMoney(currentPhases[0].ebitdaYear)}</td>
            <td>${formatMoney(currentPhases[1].ebitdaYear)}</td>
            <td>${formatMoney(currentPhases[2].ebitdaYear)}</td>
          </tr>
          <tr>
            <td><strong>投資回收期 (Payback Period)</strong></td>
            <td>${currentPhases[0].paybackMonths > 80 ? '無法回收' : currentPhases[0].paybackMonths + ' 個月'}</td>
            <td>${currentPhases[1].paybackMonths > 80 ? '無法回收' : currentPhases[1].paybackMonths + ' 個月'}</td>
            <td style="color:#34d399; font-weight:bold;">${currentPhases[2].paybackMonths > 80 ? '無法回收' : currentPhases[2].paybackMonths + ' 個月 (整體累計)'}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Section 4 -->
    <div class="section">
      <h2>🛡️ 04. 核心研發技術壁壘與同業慘痛教訓防線</h2>
      
      <div class="danger-box">
        <strong>⚠️ 失敗同業痛點 (羽田、循創等倒閉受罰先例)：</strong>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #fca5a5;">
          露天堆放發出強烈惡臭，氨氮超標導致居民多次抗爭，或廠房污水直排土壤被勒令停工拆除。未取得農地合法執照，隨時面臨斷水斷電勒令停業。
        </p>
      </div>

      <div class="success-box">
        <strong>✅ 本項目技術護城河與全合規製程：</strong>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #a7f3d0;">
          引進 <strong>Pair TC-1300 前處理設備</strong> 進行 2mm 精細磨碎與脫水。導入 <strong>LAB 活性乳酸複合益生菌</strong> 系統徹底中和異味，全封閉负压設計空氣三級淨化，廢水管道化回收，「零外排」杜絕環保紅線。預算 Phase 1 首要任務即是用 600萬 打通行政合規許可。
        </p>
      </div>
    </div>

    <!-- Section 5 -->
    <div class="section">
      <h2>💎 05. 投資決策總結：為什麼此案風險極低？</h2>
      <p>
        <strong>1. 超高的財務安全邊際：</strong>
        傳統黑水虻養殖單一依賴蛋白質變現，面臨大豆粉低價競爭。我們採取<strong>「雙向獲利商業閉環」</strong>，前端收有料去化清運費占總營收高達 53% ~ 58%。在 Phase 3，即使我們不賣任何一克蛋白產品，純靠前端收費 NT$ 1,325 / 噸即能打平全廠 OPEX！
      </p>
      <p>
        <strong>2. 漸進式出資去風險模式：</strong>
        不需要投資人一次拋出兩千萬。第一期以 <strong>600 萬元</strong> 建置 5 噸/日試行系統。核心目的在於取得「廚餘再利用特許執照」與「廢棄物清除許可」，並驗證 90 天穩定產能 SOP。在確定打通這一最難點後，投资顾问再引導資金增資 Phase 2 產能複製。
      </p>
    </div>

    <div style="border-top: 1px solid #1e293b; padding-top: 24px; text-align: center; font-size: 11px; color: #64748b; margin-top: 60px;">
      <p>黑水虻綠色資源開發與高值蛋白精煉廠籌備處</p>
      <p>本文件包含高度商業敏感信息，僅限於簽署保密協議之特定投資人、投資顧問研擬，嚴禁任何未經書面授權之影印與分發。</p>
    </div>

  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `黑水虻精煉廠_創業投資計畫書報告.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Quick helper to render standard labels
  const getBadgeColor = (tag: string) => {
    switch (tag) {
      case "技術優勢": return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "合規執行": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "市場變現": return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      default: return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-green-500 selection:text-slate-950">
      
      {/* FIXED METADATA DECORATIVE BAR */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 flex flex-wrap justify-between items-center text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" id="status-dot"></span>
          <span className="font-mono text-slate-300">BSF GREEN REFINERY PITCH DECK v2.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">2027法規轉型紅利倒數：</span>
          <span className="text-green-400 font-mono font-semibold">{countdownText}</span>
        </div>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center text-slate-950 shadow-lg shadow-green-500/10 hover:rotate-12 transition-transform duration-300">
            <Leaf className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-green-300 bg-clip-text text-transparent">
              黑水虻綠色蛋白質精煉廠
            </h1>
            <p className="text-[10px] text-slate-400 tracking-wider font-mono">BSF VERTICAL CIRCULAR ECONOMY</p>
          </div>
        </div>

        {/* Dynamic Mode Switcher */}
        <nav className="flex items-center gap-1.5 bg-slate-900/95 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab("deck")}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "deck"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-900/30"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            }`}
            id="nav-btn-deck"
          >
            <Play className="w-4 h-4 fill-current" />
            簡報放映室
          </button>
          
          <button
            onClick={() => setActiveTab("simulator")}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "simulator"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-900/30"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            }`}
            id="nav-btn-simulator"
          >
            <Calculator className="w-4 h-4" />
            ROI 戰略模擬
          </button>

          <button
            onClick={() => setActiveTab("faq")}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === "faq"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-900/30"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
            }`}
            id="nav-btn-faq"
          >
            <HelpCircle className="w-4 h-4" />
            投資問答 (FAQ)
          </button>
        </nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        
        {/* VIEW 1: PRESENTATION SLIDE DECK */}
        {activeTab === "deck" && (
          <div className="flex-1 flex flex-col justify-between gap-6" id="deck-wrapper">
            
            {/* Quick jump rail on top */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/40 p-3 rounded-xl border border-slate-800/50 gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  SLIDE <strong className="text-green-400 font-semibold">{currentSlide + 1}</strong> OF <strong className="text-slate-300 font-medium">{slideCount}</strong>
                </span>
                <span className="text-slate-700 hidden sm:inline">|</span>
                <button
                  onClick={handleExportReport}
                  className="px-3 py-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-600 hover:to-emerald-600 border border-green-500/30 hover:border-transparent text-green-400 hover:text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  title="將目前投影片內容整理成簡潔的投資計畫書報告下載"
                  id="export-pdf-pptx-btn"
                >
                  <FileText className="w-3.5 h-3.5" />
                  匯出簡報 (PDF/PPTX)
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: slideCount }).map((_, idx) => {
                  const titles = ["封面", "2027政策", "發展藍圖", "財務對比", "核心技術", "防禦防線", "投資模擬", "決策/FAQ"];
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`px-2 py-1 text-[11px] rounded transition-all ${
                        currentSlide === idx 
                          ? "bg-green-500/20 text-green-400 border border-green-500/40 font-semibold"
                          : "text-slate-500 hover:text-slate-300 bg-slate-950/40 hover:bg-slate-800/20"
                      }`}
                      title={titles[idx]}
                      id={`slide-dot-${idx}`}
                    >
                      {idx + 1} {titles[idx]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PRESENTATION DISPLAY CANVAS */}
            <div className="relative flex-1 min-h-[500px] bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800/80 rounded-2xl p-6 sm:p-8 md:p-12 overflow-hidden flex flex-col justify-center shadow-2xl shadow-green-950/5">
              
              {/* Radial gradient background accent for design depth */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  
                  {/* SLIDE 1: COVER */}
                  {currentSlide === 0 && (
                    <div className="space-y-6 max-w-4xl mx-auto py-8" id="slide-cover-container">
                      <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-green-500/20">
                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                        專為投資人與投資顧問研擬・創業投資計畫
                      </div>
                      
                      <div className="space-y-3">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-white">
                          黑水虻循環經濟與 <br />
                          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                            綠色蛋白質精煉廠
                          </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
                          以「階段性降避風險」與「漸進式規模擴充」為核心策略，卡位 2027 年法規轉型紅利的深度技術與合規護城河投資。
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">核心使命</p>
                          <p className="text-sm font-semibold text-white mt-1">SOP去風險化 & 規模複製</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">2027 轉型紅利機遇</p>
                          <p className="text-sm font-semibold text-green-400 mt-1">廚餘禁養豬/每日去化1300噸</p>
                        </div>
                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                          <p className="text-xs text-slate-400">終局佈局目標</p>
                          <p className="text-sm font-semibold text-white mt-1">100+ 噸/日 國土級防線</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-slate-500 text-xs pt-4 font-mono">
                        <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-yellow-500" /> 使用鍵盤左右方向鍵或 Space 鍵快速翻頁</span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2: 2027 POLICY OPPORTUNITY */}
                  {currentSlide === 1 && (
                    <div className="space-y-6" id="slide-policy-container">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <span className="text-xs font-bold text-green-500 tracking-widest uppercase font-mono">Windfall Opportunity</span>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            {REGULATORY_WINDFALL_2027.title}
                          </h2>
                        </div>
                        <div className="bg-green-500/20 text-green-300 font-mono text-xs px-3 py-1.5 rounded-lg border border-green-500/30">
                          2027 年正式生效
                        </div>
                      </div>

                      <p className="text-slate-300 text-sm max-w-3xl">
                        {REGULATORY_WINDFALL_2027.subtitle}，將在極短時間內重構台灣廢棄物去化流程，並產生巨大的合規化空白缺口。
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                        {REGULATORY_WINDFALL_2027.points.map((pt, idx) => (
                          <div key={idx} className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/80 flex flex-col justify-between hover:border-green-500/30 transition-all group">
                            <div>
                              <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center font-mono font-bold text-sm mb-3 group-hover:bg-green-500/20 transition-colors">
                                0{idx + 1}
                              </div>
                              <h3 className="text-md font-bold text-white mb-2">{pt.title}</h3>
                              <p className="text-xs text-slate-400 leading-relaxed">{pt.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-green-950/20 border border-green-500/20 p-4 rounded-xl flex items-start gap-3 mt-4">
                        <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-green-300 font-medium">
                          <strong>戰略判定：</strong>{REGULATORY_WINDFALL_2027.summary}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 3: ROADMAP & DRILLDOWN */}
                  {currentSlide === 2 && (
                    <div className="space-y-6" id="slide-roadmap-container">
                      <div>
                        <span className="text-xs font-bold text-green-500 tracking-widest uppercase font-mono">Investment Milestone Flow</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                          📈 項目階段性發展藍圖
                        </h2>
                      </div>

                      {/* Timeline flow overview */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
                        {[
                          { id: 1, label: "Phase 1: 5 噸/日", desc: "前期小規模試行", next: "驗證SOP/首張許可" },
                          { id: 2, label: "Phase 2: 10 噸/日", desc: "中期產能倍增", next: "大B合約/渠道變現" },
                          { id: 3, label: "Phase 3: 20 噸/日", desc: "長期工業化精煉", next: "全面自動化/碳權對接" },
                          { id: 4, label: "終局: 100+ 噸/日", desc: "國土級防線佈局", next: "龍頭優勢/綠色金融" },
                        ].map((node) => (
                          <button
                            key={node.id}
                            onClick={() => node.id <= 3 && setSelectedRoadmapPhase(node.id)}
                            className={`p-4 rounded-xl text-left border transition-all ${
                              node.id === 4 
                                ? "bg-slate-900/30 border-slate-800 text-slate-500 cursor-not-allowed"
                                : selectedRoadmapPhase === node.id
                                  ? "bg-green-500/10 border-green-500 text-green-400 shadow-md shadow-green-950/20"
                                  : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                            }`}
                            id={`roadmap-btn-${node.id}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-bold text-slate-500">STAGE 0{node.id}</span>
                              {selectedRoadmapPhase === node.id && node.id < 4 && <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />}
                            </div>
                            <h4 className="text-sm font-extrabold mt-1 text-slate-100">{node.label}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5">{node.desc}</p>
                            <div className="mt-2.5 pt-2 border-t border-slate-800/50 flex items-center justify-between">
                              <span className="text-[10px] text-green-400/90 font-medium font-mono">{node.next}</span>
                              {node.id < 4 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Phase Drilldown Detail Card */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedRoadmapPhase}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="bg-slate-900/40 p-5 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-6 items-center"
                        >
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2.5">
                              <span className="bg-green-500/20 text-green-300 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                                PHASE 0{selectedRoadmapPhase} PROFILE
                              </span>
                              <h3 className="text-md font-bold text-slate-100">
                                {INITIAL_PHASES[selectedRoadmapPhase - 1].name}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {INITIAL_PHASES[selectedRoadmapPhase - 1].highlight}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                              <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                                <span className="text-[10px] text-slate-500 block">日處理目標</span>
                                <span className="text-sm font-extrabold text-white">{INITIAL_PHASES[selectedRoadmapPhase - 1].capacity} 噸 / 日</span>
                              </div>
                              <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                                <span className="text-[10px] text-slate-500 block">選址與場房</span>
                                <span className="text-xs font-extrabold text-white block truncate">{INITIAL_PHASES[selectedRoadmapPhase - 1].siteType}</span>
                              </div>
                              <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                                <span className="text-[10px] text-slate-500 block">累計投資 CAPEX</span>
                                <span className="text-sm font-extrabold text-green-400">{formatShortMoney(INITIAL_PHASES[selectedRoadmapPhase - 1].capex)}</span>
                              </div>
                              <div className="bg-slate-950/50 p-2.5 rounded border border-slate-800/80">
                                <span className="text-[10px] text-slate-500 block">預估年純利 (EBITDA)</span>
                                <span className="text-sm font-extrabold text-yellow-400">{formatShortMoney(INITIAL_PHASES[selectedRoadmapPhase - 1].ebitdaYear)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  )}

                  {/* SLIDE 4: FINANCIAL SIDE-BY-SIDE TABLE */}
                  {currentSlide === 3 && (
                    <div className="space-y-4" id="slide-financials-container">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-green-500 tracking-widest uppercase font-mono">Financial Milestones Overview</span>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            📊 三階段投資與收益指標總覽
                          </h2>
                        </div>
                      </div>

                      {/* Desktop Table View */}
                      <div className="overflow-x-auto bg-slate-900/40 rounded-xl border border-slate-800">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-900 border-b border-slate-800 text-slate-400">
                              <th className="p-3 font-semibold">指標 / 階段</th>
                              <th className="p-3 font-semibold text-green-400">Phase 1: SOP建立</th>
                              <th className="p-3 font-semibold text-teal-400">Phase 2: 產能倍增</th>
                              <th className="p-3 font-semibold text-emerald-400">Phase 3: 工業化精煉</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 text-slate-300">
                            <tr>
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">日處理量</td>
                              <td className="p-3 font-extrabold">5 公噸 / 日</td>
                              <td className="p-3 font-extrabold">10 公噸 / 日</td>
                              <td className="p-3 font-extrabold">20 公噸 / 日</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">廠房面積</td>
                              <td className="p-3">約 80 ~ 100 坪</td>
                              <td className="p-3">約 120 ~ 150 坪</td>
                              <td className="p-3">約 200 坪 (4層立體)</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">累計投資 (CAPEX)</td>
                              <td className="p-3 text-green-400 font-semibold">{formatMoney(6000000)}</td>
                              <td className="p-3 text-teal-400 font-semibold">{formatMoney(12000000)}</td>
                              <td className="p-3 text-emerald-400 font-semibold">{formatMoney(20000000)}</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">人員編制</td>
                              <td className="p-3">3 名技術人員</td>
                              <td className="p-3">4 名技術人員</td>
                              <td className="p-3 font-semibold text-white">5 名 (全自動化)</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">月度總營收</td>
                              <td className="p-3">{formatMoney(765000)}</td>
                              <td className="p-3">{formatMoney(1530000)}</td>
                              <td className="p-3">{formatMoney(3060000)}</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">月度運營成本 (OPEX)</td>
                              <td className="p-3">{formatMoney(585000)}</td>
                              <td className="p-3">{formatMoney(1050000)}</td>
                              <td className="p-3">{formatMoney(2055000)}</td>
                            </tr>
                            <tr className="bg-green-950/10">
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">預估月純利 (EBITDA)</td>
                              <td className="p-3 font-extrabold text-green-400">{formatMoney(180000)}</td>
                              <td className="p-3 font-extrabold text-teal-400">{formatMoney(480000)}</td>
                              <td className="p-3 font-extrabold text-emerald-400">{formatMoney(1005000)} ~ {formatShortMoney(1300000)}</td>
                            </tr>
                            <tr className="bg-slate-900/40">
                              <td className="p-3 font-medium bg-slate-900/20 text-slate-400">預估投資回收期</td>
                              <td className="p-3 font-medium">33.3 個月 (單獨)</td>
                              <td className="p-3 font-medium">25.0 個月 (單獨)</td>
                              <td className="p-3 font-extrabold text-green-400">16 ~ 20 個月 (整體累計)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="flex gap-2 items-center text-slate-500 text-[11px] font-mono leading-none">
                        <AlertCircle className="w-3.5 h-3.5" /> 
                        註：上述回收期採累計滾動利潤模型，當進入最高營收的 Phase 3 時，由於高自動化帶來巨大邊際效益，累計回收期將大幅壓縮。
                      </div>
                    </div>
                  )}

                  {/* SLIDE 5: TECHNICAL & COMPLIANCE SPEC CAROUSEL */}
                  {currentSlide === 4 && (
                    <div className="space-y-6" id="slide-tech-container">
                      <div>
                        <span className="text-xs font-bold text-green-500 tracking-widest uppercase font-mono">Core Proprietary Technology Moat</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                          🔍 核心技術與合規護城河
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="tech-split-lay">
                        {/* Selector rail */}
                        <div className="space-y-2 md:col-span-1">
                          {TECHNICAL_SPECS.map((spec, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveTechSpec(idx)}
                              className={`w-full p-3.5 rounded-xl text-left border text-xs transition-all flex items-center justify-between group ${
                                activeTechSpec === idx 
                                  ? "bg-green-500/10 border-green-500/70 text-green-400"
                                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                              }`}
                              id={`tech-nav-${idx}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <Cpu className={`w-4 h-4 shrink-0 ${activeTechSpec === idx ? "text-green-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                                <span className="font-extrabold">{spec.title.split(" ")[0]}</span>
                              </div>
                              <ChevronRight className="w-4 h-4 opacity-70" />
                            </button>
                          ))}
                        </div>

                        {/* Showcase Display Column */}
                        <div className="md:col-span-2 bg-slate-900/40 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
                          <div className="space-y-4">
                            <span className="bg-green-500/15 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-500/20 uppercase font-mono">
                              TECHNOLOGY SPECS #0{activeTechSpec + 1}
                            </span>
                            <h3 className="text-lg font-bold text-white">
                              {TECHNICAL_SPECS[activeTechSpec].title}
                            </h3>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {TECHNICAL_SPECS[activeTechSpec].description}
                            </p>
                          </div>
                          
                          <div className="mt-8 border-t border-slate-800/80 pt-4 flex gap-4 text-xs font-mono text-slate-400">
                            <div>
                              <span className="text-[10px] text-slate-500 block">異味控制效率</span>
                              <span className="text-green-400 font-bold">99.8% 氨氮中和</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">日處理能級 (P3)</span>
                              <span className="text-white font-bold">20,000 公斤</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">污水排放標準</span>
                              <span className="text-green-400 font-bold">100% 廠內循環零排放</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 6: RISK DEFENSE */}
                  {currentSlide === 5 && (
                    <div className="space-y-5" id="slide-risk-container">
                      <div>
                        <span className="text-xs font-bold text-red-400 tracking-widest uppercase font-mono">Risk Management & Defense Barriers</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                          🛡️ 商業護城河比對與前車之鑑防範
                        </h2>
                      </div>

                      <p className="text-xs text-slate-400 max-w-3xl">
                        前車之鑑，後事之師。我們徹底研究了近期因環保罰單或經營不善出局的同業（如循創、羽田），並在硬體資產中內化合規性：
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {RISK_MANAGEMENT.map((risk, idx) => (
                          <div key={idx} className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-green-400 shrink-0" />
                                <h3 className="font-extrabold text-sm text-white">{risk.category}</h3>
                              </div>
                              
                              <div className="bg-red-950/20 border border-red-500/10 p-2.5 rounded-lg">
                                <span className="text-[10px] text-red-400 font-bold block uppercase tracking-wider">⚠️ 失敗同業痛點</span>
                                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">{risk.failedExample}</p>
                              </div>

                              <div className="bg-green-950/20 border border-green-500/15 p-2.5 rounded-lg">
                                <span className="text-[10px] text-green-400 font-bold block uppercase tracking-wider">✅ 本廠解決對策</span>
                                <p className="text-[11px] text-slate-300 leading-normal mt-0.5">{risk.ourSolution}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SLIDE 7: ROI SIMULATING CALLOUT */}
                  {currentSlide === 6 && (
                    <div className="space-y-6 max-w-4xl mx-auto text-center py-6" id="slide-roi-cta-container">
                      <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-green-500/20">
                        <DollarSign className="w-4 h-4" />
                        Interactive Investment Stress Test
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                          投顧評估必經：互動式 <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">投資回報與壓力測試</span>
                        </h2>
                        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
                          我們拒絕提供生硬死板的靜態預測。為了證明本案具有極高安全邊際，我們為您設計了即時運算的『ROI模擬沙盒』：
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
                        {CALCULATOR_KNOWLEDGE.bullets.map((el, idx) => (
                          <div key={idx} className="bg-slate-900/60 p-4.5 rounded-xl border border-slate-800/80 space-y-1">
                            <span className="text-green-400 text-xs font-bold block font-mono">✓ {el.label}</span>
                            <p className="text-[11px] text-slate-300 leading-relaxed">{el.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => setActiveTab("simulator")}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-green-500/10 hover:shadow-green-500/20 hover:scale-105 active:scale-95 transition-transform"
                          id="cta-sim-btn"
                        >
                          <Sliders className="w-4 h-4" />
                          點擊開啟：投資模擬儀表板
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 8: SUMMARY CONCLUSION */}
                  {currentSlide === 7 && (
                    <div className="space-y-6" id="slide-summary-container">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-xs font-bold text-green-500 tracking-widest uppercase font-mono">Investment Conclusion Synthesis</span>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                            💎 投資總結：為什麼本案勢在必得？
                          </h2>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-4">
                          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 space-y-2">
                            <h3 className="text-sm font-bold text-green-400 flex items-center gap-2">
                              <CheckCircle2 className="w-4.5 h-4.5 text-green-400" />
                              完美的 B2B 雙向商業閉環
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              前端處理廢棄物收取穩定清運現金流（收料即獲利），後端精煉出高附加價值的昆蟲蛋白飼料原料與超乾淨蟲砂肥料，雙管道獲利抵抗波動。
                            </p>
                          </div>

                          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 space-y-2">
                            <h3 className="text-sm font-bold text-green-400 flex items-center gap-2">
                              <CheckCircle2 className="w-4.5 h-4.5 text-green-400" />
                              極低風險的『階段性』資本推进
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              第一階段僅需 600 萬，核心使命在於打通行政許可、建立核心SOP，當去風險化(De-risking)判定點合格後，才追加預算進入產能倍增階段，保障資本安全。
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-950/20 via-emerald-950/10 to-slate-950 p-6 rounded-xl border border-green-500/20 flex flex-col justify-between">
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono font-bold tracking-widest bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full uppercase border border-green-500/20 w-max block">
                              2027 REGULATORY WINDOW
                            </span>
                            <h3 className="text-md font-extrabold text-white">
                              卡位 2027 禁養政策的最優解
                            </h3>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              我們在法規禁令徹底生效前，提前兩年佈局，完成 Phase 1 與 2 的實戰演練與合規登記卡位。禁令一到，我們即是去化市場中少數且最具規模的合法處理大門，享盡法規保護下的壟斷級初期紅利。
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                            <span>諮詢窗口: z80705682z@gmail.com</span>
                            <span className="text-green-400 font-bold flex items-center gap-1">CAPEX Limit: 2,000 W</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* PRESENTATION PROGRESS BAR & CONTROLS */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Stepper dots visualizer */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">專用播放器控制</span>
              </div>

              {/* Action Stepper buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 text-xs font-bold bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-colors active:scale-95"
                  id="prev-slide-btn"
                >
                  <ArrowLeft className="w-4 h-4" />
                  上一頁
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slideCount - 1))}
                  disabled={currentSlide === slideCount - 1}
                  className="px-4 py-2 text-xs font-bold bg-green-600 hover:bg-green-500 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-colors active:scale-95"
                  id="next-slide-btn"
                >
                  下一頁
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar background track */}
              <div className="w-full sm:w-1/3 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-300" 
                  style={{ width: `${slideProgress}%` }}
                />
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: INTERACTIVE ROI STRATEGY SIMULATOR SANDBOX */}
        {activeTab === "simulator" && (
          <div className="space-y-6" id="simulator-view-container">
            
            {/* Title / Header */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/20">
                  <Calculator className="w-3.5 h-3.5" />
                  動態運算引擎・抗風險彈性測試
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">黑水虻精煉廠投資回報模擬沙盒</h2>
                <p className="text-xs text-slate-400">當您調整前端處理費、後端產品售價或成本乘數時，計算模型會自動為您運算三階段的年純利 EBITDA 與預估回收期，測試項目的保本抗壓限度。</p>
              </div>
              <button
                onClick={handleResetSim}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 rounded-lg flex items-center gap-2 transition-colors duration-150"
                id="reset-sim-btn"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                重設標準常模
              </button>
            </div>

            {/* Sandbox Split: Left Sliders, Right Dashboard projections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Interactive Param Sliders (span 5) */}
              <div className="lg:col-span-5 bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-5">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-green-400" />
                  調節操作變量 (Sensitivity Adjust)
                </h3>

                {/* SLIDER 1: Waste Treatment Fee */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">B2B 廚餘再利用處理費 (NT$/公噸)</span>
                    <span className="text-green-400 font-bold font-mono">{formatMoney(simParams.treatmentFee)}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="5000"
                    step="100"
                    value={simParams.treatmentFee}
                    onChange={(e) => setSimParams({ ...simParams, treatmentFee: parseInt(e.target.value) })}
                    className="w-full accent-green-500 cursor-pointer"
                    id="slider-treatment-fee"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>$1,000 (保本底線)</span>
                    <span className="text-green-500/80 font-medium">$3,000 (現行市場常模)</span>
                    <span>$5,000 (急迫去化行情)</span>
                  </div>
                </div>

                {/* SLIDER 2: Insect Larvae Protein Selling Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">有機昆蟲蛋白質賣價 (NT$/公噸)</span>
                    <span className="text-green-400 font-bold font-mono">{formatMoney(simParams.proteinPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="25000"
                    max="65000"
                    step="1000"
                    value={simParams.proteinPrice}
                    onChange={(e) => setSimParams({ ...simParams, proteinPrice: parseInt(e.target.value) })}
                    className="w-full accent-green-500 cursor-pointer"
                    id="slider-protein-price"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>$25,000 (豆粉競爭)</span>
                    <span className="text-green-500/80 font-medium">$45,000 (標準常模價)</span>
                    <span>$65,000 (寵糧抗敏溢價)</span>
                  </div>
                </div>

                {/* SLIDER 3: Organic Fertilizer/Frass Selling Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">副產品蟲砂肥料賣價 (NT$/公噸)</span>
                    <span className="text-green-400 font-bold font-mono">{formatMoney(simParams.frassPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="8000"
                    max="25000"
                    step="500"
                    value={simParams.frassPrice}
                    onChange={(e) => setSimParams({ ...simParams, frassPrice: parseInt(e.target.value) })}
                    className="w-full accent-green-500 cursor-pointer"
                    id="slider-frass-price"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>$8,000</span>
                    <span className="text-green-500/80 font-medium">$15,005 (常模)</span>
                    <span>$25,000 (有機認證溢價)</span>
                  </div>
                </div>

                {/* SLIDER 4: CAPEX Overrun Multiplier */}
                <div className="space-y-2 border-t border-slate-800/80 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">CAPEX 支出變動係數 (建廠成本)</span>
                    <span className="text-yellow-400 font-bold font-mono">{(simParams.capexMultiplier * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.5"
                    step="0.05"
                    value={simParams.capexMultiplier}
                    onChange={(e) => setSimParams({ ...simParams, capexMultiplier: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-500 cursor-pointer"
                    id="slider-capex-multiplier"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>80% (精省採購)</span>
                    <span className="text-yellow-500/80">100% (預估基準)</span>
                    <span>150% (極端工期膨脹)</span>
                  </div>
                </div>

                {/* SLIDER 5: OPEX scaling Multiplier */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-medium">OPEX 營運耗能變動係數 (電/菌/水/人)</span>
                    <span className="text-yellow-400 font-bold font-mono">{(simParams.opexMultiplier * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.5"
                    step="0.05"
                    value={simParams.opexMultiplier}
                    onChange={(e) => setSimParams({ ...simParams, opexMultiplier: parseFloat(e.target.value) })}
                    className="w-full accent-yellow-500 cursor-pointer"
                    id="slider-opex-multiplier"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>80% (用菌精配)</span>
                    <span className="text-yellow-500/80">100% (基準)</span>
                    <span>150% (極端水電飛漲)</span>
                  </div>
                </div>

                {/* Stress Analysis Box */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-red-400 block mb-1">🔍 敏感性壓力測試判定：</span>
                  {simParams.treatmentFee < 2000 ? (
                    <p className="text-[11px] text-slate-400 leading-normal">
                      <strong>【低收料費警報】</strong>：當廚餘費跌至兩千元以下時，第一階段因缺乏規模體量，月純利會被邊際固定成本侵蝕。然而，此狀態下
                      <strong className="text-green-400"> 第三階段 (20噸) </strong> 依舊可憑高產能與自動化獲利！這正是大規律合規精煉廠的絕對壁壘。
                    </p>
                  ) : simParams.treatmentFee >= 3000 && simParams.proteinPrice >= 45000 ? (
                    <p className="text-[11px] text-green-400/90 leading-normal">
                      <strong>【黃金高回報通道】</strong>：當處理費維持正常合規水準，且蛋白質獲適度溢價時。第三階段預估年純利將挑戰
                      <strong> NT$ 15,000,000+ </strong>，累計回收期將極速縮短至 <strong>16 個月</strong> 以內。體現精良自動化工藝的暴利變現。
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 leading-normal">
                      <strong>【常規穩健運行】</strong>：本案即使在各項產品售價小幅滑坡時，三階段經營全部為正向現金流。双重獲利安全網足夠支撐，投資安全度極高。
                    </p>
                  )}
                </div>

              </div>

              {/* Right Column: Live EBITDA Comparison & Cards (span 7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual Bar Comparison Graph using SVG - dynamic representation! */}
                <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider">
                      📊 動態運算結果 - 年純利 EBITDA 對比
                    </h4>
                    <span className="text-[11px] text-green-400 font-mono">自動即時響應</span>
                  </div>

                  <div className="space-y-4">
                    {projectedData.map((phase) => {
                      // Normalize percent for SVG rendering, assume max 20M annual EBITDA
                      const valPercent = Math.min(Math.max((phase.ebitdaYear / 20000000) * 100, 2), 100);
                      
                      return (
                        <div key={phase.id} className="space-y-1.5" id={`sim-bar-item-${phase.id}`}>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-extrabold text-slate-300 truncate">{phase.shortName} (處理能力 {phase.capacity}噸/日)</span>
                            <span className="font-bold text-yellow-400 font-mono">EBITDA: {formatMoney(phase.ebitdaYear)} / 年</span>
                          </div>
                          
                          <div className="relative w-full h-8 bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center px-3 group">
                            {/* Inner dynamic bar filled */}
                            <div 
                              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600/70 to-emerald-500/70 border-r-2 border-emerald-400 transition-all duration-300 pointer-events-none" 
                              style={{ width: `${valPercent}%` }}
                            />
                            {/* Stats Overlay inside */}
                            <span className="relative z-10 text-[10px] text-white font-mono flex items-center gap-2">
                              <span>CAPEX {formatShortMoney(phase.capex)}</span>
                              <span>•</span>
                              <span>月營收: {formatShortMoney(phase.monthlyRevenue)}</span>
                              <span>•</span>
                              <span>月 OPEX: {formatShortMoney(phase.opex)}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Return metrics responsive side-by-side cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {projectedData.map((phase) => {
                    const isFastRec = phase.paybackMonths <= 20;

                    return (
                      <div 
                        key={phase.id} 
                        className={`bg-slate-900/60 p-4 rounded-xl border flex flex-col justify-between ${
                          phase.id === 3 ? "border-green-500/30 ring-1 ring-green-950" : "border-slate-800"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-mono">PHASE {phase.id} METRICS</span>
                            {phase.id === 3 && <Zap className="w-3.5 h-3.5 text-yellow-400 shrink-0" />}
                          </div>
                          <h4 className="text-xs font-extrabold text-slate-200 mt-1">{phase.shortName}</h4>
                          <p className="text-[10px] text-slate-400 mt-1">{phase.highlight.split("，")[0]}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/60">
                          <span className="text-[10px] text-slate-500 block">預估回收期：</span>
                          <div className="flex items-baseline gap-1 mt-0.5">
                            <span className={`text-xl font-extrabold ${isFastRec ? "text-green-400" : "text-yellow-400"} font-mono`}>
                              {phase.paybackMonths > 80 ? "無法回收" : `${phase.paybackMonths}`}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">個月</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono block mt-1">月盈餘 {formatShortMoney(phase.ebitda)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* VIEW 3: FAQ SECTION */}
        {activeTab === "faq" && (
          <div className="space-y-6" id="faq-view-container">
            
            {/* Search and header component */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">常見投資人與合規問答 FAQ</h2>
                  <p className="text-xs text-slate-400">專為投資顧問打通水土法令、政策紅利、蛋白質變現渠道、資本保全方案等實施細部解答。</p>
                </div>
                
                {/* Search input tab */}
                <div className="w-full md:w-64">
                  <input
                    type="text"
                    placeholder="輸入關鍵字進行快篩..."
                    value={faqSearch}
                    onChange={(e) => setFaqSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs px-3.5 py-2 rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
                    id="faq-search-input"
                  />
                </div>
              </div>

              {/* Tag filtering pills */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-800/50">
                {["全部", "技術優勢", "合規執行", "市場變現", "資金保全"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFaqActiveTag(tag)}
                    className={`px-3 py-1 text-[11px] rounded-lg transition-all ${
                      faqActiveTag === tag
                        ? "bg-green-600 text-white font-bold"
                        : "text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-800/80"
                    }`}
                    id={`faq-tag-${tag}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-3">
              {FAQS
                .filter((f) => faqActiveTag === "全部" || f.tag === faqActiveTag)
                .filter((f) => f.question.includes(faqSearch) || f.answer.includes(faqSearch))
                .map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-slate-900/40 rounded-xl border border-slate-800 overflow-hidden transition-all duration-200"
                      id={`faq-item-${idx}`}
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="w-full p-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-md text-slate-200 hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded shrink-0 ${getBadgeColor(faq.tag)}`}>
                            {faq.tag}
                          </span>
                          <span className="leading-snug">{faq.question}</span>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90 text-green-400" : ""}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-4.5 pt-0 border-t border-slate-800/40 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/30">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

              {FAQS
                .filter((f) => faqActiveTag === "全部" || f.tag === faqActiveTag)
                .filter((f) => f.question.includes(faqSearch) || f.answer.includes(faqSearch))
                .length === 0 && (
                <div className="text-center py-10 bg-slate-900/20 rounded-xl border border-slate-800/50">
                  <p className="text-slate-400 text-sm">找不到符合條件的問答。請試試其他關鍵字。</p>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900/90 py-5 px-6 text-center text-[10px] text-slate-500 tracking-wider">
        <p>© 2026 黑水虻綠色資源開發精煉廠創業投資團隊. All Rights Reserved.</p>
        <p className="mt-1">
          本簡報為投資合約意向之保密附屬資料・未經許可請勿外傳洩露
          <span className="mx-2">|</span>
          聯絡與資詢諮詢：z80705682z@gmail.com
        </p>
      </footer>

    </div>
  );
}
