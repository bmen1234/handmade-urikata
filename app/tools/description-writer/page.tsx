import AIToolClient from '@/components/AIToolClient'
export const metadata = { title:'説明文ライターAI | ハンドメイド売り方ラボ', description:'作品の情報を入力するだけで、購買意欲を高める商品説明文をAIが自動生成します。' }
const sys = `あなたはminne・Creemaで売れるハンドメイド商品ページの専門ライターです。購買率を高める商品説明文を生成してください。

構成：
1. 冒頭フック（2〜3行）：世界観・コンセプト
2. 作品の特徴（箇条書き3〜5点）
3. こんな方におすすめ（3点）
4. サイズ・仕様
5. ご注意事項

全体400〜600文字、柔らかくて上品な文体で。`
export default function Page() {
  return <AIToolClient emoji="✍️" title="説明文ライターAI" description="作品情報を入力するだけ。売れる説明文の型をAIが自動適用します" submitLabel="説明文を生成する →" systemPrompt={sys}
    fields={[
      {key:'product_name',label:'作品名',placeholder:'例：天然石ピアス、名入れタオルハンカチ'},
      {key:'material',label:'素材・技法',placeholder:'例：淡水パール・14kgfゴールドフィルド'},
      {key:'size',label:'サイズ・重さ',placeholder:'例：縦8cm×横5cm、重さ約15g'},
      {key:'concept',label:'作品のこだわり・世界観',placeholder:'例：毎日使えるシンプルさと特別な日にも映える上品さを両立',type:'textarea'},
      {key:'target',label:'ターゲット・贈り物シーン',placeholder:'例：自分へのご褒美、誕生日プレゼント、結婚祝い'},
    ]}
    userPromptBuilder={i=>`作品名：${i.product_name}\n素材：${i.material}\nサイズ：${i.size}\nこだわり：${i.concept}\nターゲット：${i.target}\n\n商品説明文を生成してください。`}
  />
}
