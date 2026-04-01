import AIToolClient from '@/components/AIToolClient'
export const metadata = { title:'ハンドメイド価格計算AI | ハンドメイド売り方ラボ', description:'材料費・制作時間を入力するだけで、minne・Creema向けの適正価格をAIが自動計算します。' }
const sys = `あなたはハンドメイド作家1,000名以上を指導した販売の専門家です。入力された情報をもとに、minne・Creemaでの適正な販売価格を算出してください。

【適正価格の計算】
- 原価：○○円
- 人件費：○○円（制作時間×時給1,200円）
- 手数料込み小計：○○円

【推奨販売価格】
- minne向け：○○円〜○○円
- Creema向け：○○円〜○○円

【価格設定のアドバイス】
具体的なアドバイスを3〜4行で。`
export default function Page() {
  return <AIToolClient emoji="¥" title="適正価格計算AI" description="材料費と制作時間を入力するだけ。AIがminne・Creema向けの適正価格を自動算出します" submitLabel="適正価格を計算する →" systemPrompt={sys}
    fields={[
      {key:'category',label:'作品のジャンル',placeholder:'例：アクセサリー（ピアス）、布小物（ポーチ）'},
      {key:'material_cost',label:'材料費（円）',placeholder:'例：500',type:'number'},
      {key:'work_time',label:'制作時間（分）',placeholder:'例：90',type:'number'},
      {key:'features',label:'作品の特徴・こだわり（任意）',placeholder:'例：天然石使用、一点もの、手縫い',type:'textarea'},
    ]}
    userPromptBuilder={i=>`作品ジャンル：${i.category}\n材料費：${i.material_cost}円\n制作時間：${i.work_time}分\nこだわり：${i.features||'なし'}\n\n適正な販売価格を算出してください。`}
  />
}
