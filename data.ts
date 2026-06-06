import { PhaseData, FAQItem } from "./types";

export const INITIAL_PHASES: PhaseData[] = [
  {
    id: 1,
    name: "Phase 1: 前期小規模試行與 SOP 建立",
    shortName: "Phase 1: 5噸/日 試行",
    capacity: 5,
    area: "80 ~ 100 坪",
    siteType: "農業區合規場域或工業區",
    capex: 6000000,
    staff: 3,
    dailyRevenue: 25500,
    monthlyRevenue: 765000,
    opex: 585000,
    ebitda: 180000,
    ebitdaYear: 2160000,
    paybackMonths: 33.3,
    highlight: "驗證 SOP、取得首張廚餘再利用許可與廢清許可，安全去風險化。"
  },
  {
    id: 2,
    name: "Phase 2: 中期產能倍增與商業渠道對接",
    shortName: "Phase 2: 10噸/日 倍增",
    capacity: 10,
    area: "120 ~ 150 坪",
    siteType: "工業區 / 乙種工業用地",
    capex: 12000000,
    staff: 4,
    dailyRevenue: 51000,
    monthlyRevenue: 1530000,
    opex: 1050000,
    ebitda: 480000,
    ebitdaYear: 5760000,
    paybackMonths: 25.0,
    highlight: "B2B 大型團膳、餐飲合約，取得副產品『肥料登記證』開啟雙高毛利通路。"
  },
  {
    id: 3,
    name: "Phase 3: 長期工業化精煉與最大化收益",
    shortName: "Phase 3: 20噸/日 精煉",
    capacity: 20,
    area: "約 200 坪 (4層樓立體佈局)",
    siteType: "乙種工業區 (全密閉自動化廠房)",
    capex: 20000000, // Cumulative CAPEX is NT$ 20M
    staff: 5,
    dailyRevenue: 102000,
    monthlyRevenue: 3060000,
    opex: 2055000,
    ebitda: 1005000, // Standard 1.005M, can reach 1.3M with automation efficiency
    ebitdaYear: 12060000, // up to 15.6M
    paybackMonths: 18.0, // Avg of 16-20 months
    highlight: "自動化機械手臂 + Pair TC-1300，解鎖 ESG 碳權減碳 300kg CO2/噸機遇。"
  }
];

export const TECHNICAL_SPECS = [
  {
    title: "Pair TC-1300 前處理系統",
    description: "本精煉廠技術核心。小時處理能力達 600 - 800 公斤，脫水率 80%，出料粒徑控制在 2mm 以下，為黑水虻幼蟲調製最佳黃金進食配比，縮短養殖週期 15%。"
  },
  {
    title: "LAB 乳酸菌噴灑除臭系統",
    description: "導入高效微生物（乳酸桿菌、多種酵母菌複合配方）進行前端噴灑發酵，在 20 分鐘內降解氨氮 (NH3) 與硫化氫 (H2S)，徹底消除有機異味。"
  },
  {
    title: "全密閉負壓環控製程",
    description: "吸取循創、羽田等同業停業教訓，採多段高氣換氣次數、酸鹼洗滌塔、以及活性碳過濾器系統，空氣全收集再過濾排放，符合嚴苛的城市外鄰避標準。"
  },
  {
    title: "4層樓立體垂直養殖模組",
    description: "突破傳統平面養殖地坪限制，研發重力導引多層投料架、感應式自走播灑系統，在 200 坪內實現相當於傳統平房 800 坪之驚人產能密度。"
  }
];

export const REGULATORY_WINDFALL_2027 = {
  title: "2027年法規轉型紅利點",
  subtitle: "台灣廚餘處理國土級防線的重塑機遇",
  points: [
    {
      title: "廚餘養豬禁令正式生效",
      text: "由於非洲豬瘟防範，2027 年全台各縣市推行廚餘不准直接養豬政策，全台每日高達 1,300 噸廚餘面臨去化困難，地方政府將大幅補貼多元再利用場域。"
    },
    {
      title: "B2B 收有料處理費攀升至 NT$3,000+/噸",
      text: "大型連鎖團膳、超商食品加工廠去化壓力倍增，以往付費給養豬戶的廚餘費將流向合法認證的黑水虻精煉廠。前端收料不但不用成本，更能賺取豐厚的特許收費。"
    },
    {
      title: "ESG 碳交易與CBAM 跨境對接",
      text: "黑水虻每處理 1 噸廚餘，比傳統堆肥與掩埋節省 300 公斤的二氧化碳排放量。Phase 3 年產能可創造達 2,190 噸的高純度減碳碳權，對接綠色金融。"
    }
  ],
  summary: "我們在預計 2027 禁令生效前，便已完成了 Phase 1 & 2 的技術打磨與首張許可卡位，能以完全合規之姿，極速搶佔此巨大空白市場！"
};

export const RISK_MANAGEMENT = [
  {
    category: "異味與污水防線",
    failedExample: "同業循創與羽田因為戶外開放堆置、氨氮洩漏臭味招致附近居官抗爭、被局勒令停工。",
    ourSolution: "堅持全密閉廠房、廢水管道化循環自用（零排放）、特製 LAB 微生物除臭精準降解分子，化鄰避為鄰利。"
  },
  {
    category: "法規合規防線",
    failedExample: "傳統養殖戶未取得合法地目、無廚餘再利用許可，游走灰色地帶隨時會被重罰取締。",
    ourSolution: "Phase 1 最核心任務即是花費 600 萬在合法選址取得全套『廚餘再利用許可資格』與『清除許可』，以合規護城河圈地。"
  },
  {
    category: "市場價格波動",
    failedExample: "過度仰賴單一出售蟲體蛋白，遭逢進口大豆粉低價競爭時，毛利率極具跳水風險。",
    ourSolution: "極致的『雙軌獲利』安全網。前端收費（廚餘清理費）占總營收高達 53%-58% 以上，保障基本 OPEX 現金流；後端蛋白與高毛利蟲糞肥料為超純利加速器。"
  }
];

export const CALCULATOR_KNOWLEDGE = {
  title: "投資顧問評估與損益平衡壓力測試",
  description: "展示與驗證我們在 Phase 3 的高安全邊際。在日處理 20 噸規模下，本項目的營運抗壓能力驚人。",
  bullets: [
    {
      label: "保本保底底線",
      value: "當產能達 20 噸且無任何蛋白銷售時，僅靠前端廚餘處理費 $1,325/噸 (行情 44%) 即可完全打平 OPEX 現金流。"
    },
    {
      label: "極高安全邊際",
      value: "以現行市場收料費 NT$3,000 / 噸計算，即便市場收費行情砍半，精煉廠依舊能維持穩定獲利，抗風險能力達 55% 以上。"
    },
    {
      label: "小規模去風險",
      value: "Phase 1 親民的 600萬 CAPEX 是去風險的 SOP 打磨器。相比傳統同業動輒投入數千萬，我們首期資金安全性高出數倍。"
    }
  ]
};

export const FAQS: FAQItem[] = [
  {
    question: "為什麼選擇黑水虻，而不是一般的堆肥、或是生質能厭氧發酵？",
    answer: "堆肥佔地大、耗時數月且異味嚴重，生質發酵 CAPEX 極高。黑水虻處理週期僅需 12 - 14 天，轉換效率驚人：12天內就將廢棄物轉化為高價動物性昆蟲蛋白與蟲砂，並有高減碳效率，投資回收期縮短 60%。",
    tag: "技術優勢"
  },
  {
    question: "前期選址大概需要多大面積？如何符合水土保持與環保法規？",
    answer: "Phase 1 僅需 80~100 坪。我們優先尋找農業區合規場域或工業區廠房。前端廚餘粉碎與脫水都在負壓室內，污水經脫水後高溫處理，可部分回噴或委託合法業者清理，做到『零外部廢水排放』，嚴格杜絕污染紅線。",
    tag: "合規執行"
  },
  {
    question: "後端的蛋白質銷售通路主要對接哪些客戶？",
    answer: "主要有三大通路：1) 中大型水產養殖、高檔觀賞魚飼料廠（黑水虻富含月桂酸、免疫活性肽，能提高魚蝦成活率）；2) 寵物食品（天然抗敏原料，極受貓狗糧廠歡迎）；3) 散裝蟲糞砂（具有土壤改良效力，直供溫室有機蔬菜農場）。",
    tag: "市場變現"
  },
  {
    question: "如果 CAPEX 超出預算，對投資人的防護措施是什麼？",
    answer: "我們採用『階段性去風險化』策略。在 Phase 1 預算 600 萬中已編列 10% 備用金。只有在第一階段『90天穩定處理 5 噸廚餘』與『合法許可證到手』雙重指標完成後，投資顧問才會啟動 Phase 2 增資計畫。這不是一步到位的賭注，而是精準控風險的階段性佈局。",
    tag: "資金保全"
  }
];

// Helper to project simulation results
export function projectPhases(params: {
  treatmentFee: number;
  proteinPrice: number;
  frassPrice: number;
  capexMultiplier: number;
  opexMultiplier: number;
}): PhaseData[] {
  // Let's create realistic projections based on variables
  // Standard fees: Treatment: 3000/ton, Larvae/Protein: 45000/ton (0.15 tons per ton of waste), Frass: 15000/ton (0.2 tons per ton of waste)
  // Let's write linear dynamic calculations for the 3 phases
  
  return INITIAL_PHASES.map((phase) => {
    const scale = phase.capacity; // 5, 10, 20
    
    // Revenue logic:
    // Treatment fee revenue per day = scale * treatmentFee
    const dailyTreatmentRev = scale * params.treatmentFee;
    
    // Green protein yield is roughly 15% of waste weight, organic fertilizer is 20%.
    // Daily Protein Yield = scale * 0.15 tons (1000kg -> 150kg yield)
    // Daily Frass Yield = scale * 0.20 tons
    const dailyProteinRev = scale * 0.15 * (params.proteinPrice);
    const dailyFrassRev = scale * 0.20 * (params.frassPrice);
    
    const recalculatedDailyRev = dailyTreatmentRev + dailyProteinRev + dailyFrassRev;
    const recalculatedMonthlyRev = recalculatedDailyRev * 30;
    
    // OPEX logic:
    // Base opex scales slightly below linear.
    const baseOpex = phase.opex;
    const recalculatedOpex = baseOpex * params.opexMultiplier;
    
    // EBITDA:
    let recalculatedEbitda = recalculatedMonthlyRev - recalculatedOpex;
    if (recalculatedEbitda < 20000) {
      recalculatedEbitda = Math.max(recalculatedEbitda, -50000); // Guard minimum
    }
    const ebitdaYear = recalculatedEbitda * 12;
    
    // CAPEX scales with multiplier
    const recalculatedCapex = phase.capex * params.capexMultiplier;
    
    // Payback period
    let payback = 99;
    if (recalculatedEbitda > 0) {
      payback = recalculatedCapex / recalculatedEbitda;
    }
    
    return {
      ...phase,
      capex: recalculatedCapex,
      dailyRevenue: recalculatedDailyRev,
      monthlyRevenue: recalculatedMonthlyRev,
      opex: recalculatedOpex,
      ebitda: recalculatedEbitda,
      ebitdaYear: ebitdaYear,
      paybackMonths: Number(payback.toFixed(1))
    };
  });
}
