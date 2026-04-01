import AIToolClient from '@/components/AIToolClient'
export const metadata = { title:'タイトル生成AI | ハンドメイド売り方ラボ', description:'作品の特徴を入力するだけで、minne・Creemaの検索で上位表示されやすいタイトル候補を5つ生成します。' }
const sys = `あなたはminne・CreemaのSEOに詳しい専門家です。入力された作品情報をもとに、検索上位を狙えるタイトル候補を5つ生成してください。

タイトルは30〜50文字、重要キーワードを前半に配置、素材・商品種別・特徴・シーン・ターゲットを含めてください。

【タイトル候補1〜5】
各タイトルと「このタイトルの強み」を一言で。

【狙っているキーワード】
上位表示を狙うキーワードをリストアップ。`
export default function Page() {
  return <AIToolClient emoji="✏️" title="タイトル生成AI" description="作品の特徴を入力するだけ。検索上位を狙えるタイトルを5つ生成します" submitLabel="タイトルを生成する →" systemPrompt={sys}
    fields={[
      {key:'platform',label:'販売プラットフォーム',placeholder:'例：minne、Creema、両方'},
      {key:'category',label:'作品カテゴリ',placeholder:'例：ピアス、ポーチ、名入れタオル'},
      {key:'material',label:'素材・技法',placeholder:'例：天然石・淡水パール、ハーバリウム'},
      {key:'features',label:'特徴・こだわり・シーン',placeholder:'例：シンプル・大人かわいい・結婚式向け',type:'textarea'},
    ]}
    userPromptBuilder={i=>`プラットフォーム：${i.platform}\nカテゴリ：${i.category}\n素材・技法：${i.material}\n特徴・シーン：${i.features}\n\n検索上位を狙えるタイトルを5つ生成してください。`}
  />
}
