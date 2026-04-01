'use client'
import { useState } from 'react'
interface Field { key:string; label:string; placeholder:string; type?:'text'|'number'|'textarea' }
interface Props { systemPrompt:string; userPromptBuilder:(i:Record<string,string>)=>string; fields:Field[]; title:string; description:string; submitLabel:string; emoji:string }
export default function AIToolClient({systemPrompt,userPromptBuilder,fields,title,description,submitLabel,emoji}:Props) {
  const [inputs,setInputs] = useState<Record<string,string>>({})
  const [result,setResult] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')
  const handleSubmit = async () => {
    const missing = fields.filter(f=>!inputs[f.key]?.trim())
    if(missing.length>0){setError(`${missing[0].label}を入力してください`);return}
    setError('');setLoading(true);setResult('')
    try {
      const res = await fetch('/api/ai-tool',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({systemPrompt,userPrompt:userPromptBuilder(inputs)})})
      if(!res.ok) throw new Error()
      const data = await res.json()
      setResult(data.result)
    } catch { setError('エラーが発生しました。もう一度お試しください。') }
    finally { setLoading(false) }
  }
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-brand-green-light rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{emoji}</div>
        <p className="section-label mb-2">{title}</p>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-xs text-gray-400 mt-1">登録不要・完全無料</p>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
        {fields.map(f=>(
          <div key={f.key}>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">{f.label}</label>
            {f.type==='textarea'
              ? <textarea rows={4} placeholder={f.placeholder} value={inputs[f.key]||''} onChange={e=>setInputs(p=>({...p,[f.key]:e.target.value}))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green resize-none"/>
              : <input type={f.type||'text'} placeholder={f.placeholder} value={inputs[f.key]||''} onChange={e=>setInputs(p=>({...p,[f.key]:e.target.value}))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green"/>
            }
          </div>
        ))}
        {error&&<p className="text-red-500 text-sm">{error}</p>}
        <button onClick={handleSubmit} disabled={loading} className="w-full btn-primary justify-center py-3.5 disabled:opacity-50">
          {loading?'AIが生成中...':submitLabel}
        </button>
      </div>
      {result&&(
        <div className="mt-6 bg-brand-green-light border border-brand-green/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-brand-green text-sm">AIの回答</p>
            <button onClick={()=>navigator.clipboard.writeText(result)} className="text-xs text-brand-green border border-brand-green/30 px-3 py-1 rounded-full hover:bg-brand-green hover:text-white transition-colors">コピー</button>
          </div>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  )
}
