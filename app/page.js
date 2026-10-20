jsx
"use client"
import { useState, useEffect } from 'react'

const initialPosts = [
  { id:1, title:"Super Eagles Secure 2-1 Victory Over Ghana", cat:"Sports", img:"https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800", breaking:true, trending:true, date:"Oct 19" },
  { id:2, title:"Nollywood Actress Announces New Movie Release Set for December", cat:"Entertainment", img:"https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800", trending:false, date:"Oct 18" },
  { id:3, title:"Nigeria Government Launches New Youth Jobs Initiative Nationwide", cat:"Jobs", img:"https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800", trending:true, date:"Oct 18" },
  { id:4, title:"Lagos Traffic: New BRT Route Launched to Ease Commute in Ikeja", cat:"Gist", img:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800", trending:false, date:"Oct 17" },
  { id:5, title:"Afrobeats Star Drops New Album Today, Fans React Online", cat:"Entertainment", img:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800", trending:true, date:"Oct 17" },
]

export default function Home() {
  const [posts, setPosts] = useState(initialPosts)
  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("All")
  const [showAdmin, setShowAdmin] = useState(false)
  const [newPost, setNewPost] = useState({ title:"", cat:"Gist", img:"" })

  const filtered = posts.filter(p => (cat==="All" || p.cat===cat) && p.title.toLowerCase().includes(search.toLowerCase()))
  const trending = posts.filter(p => p.trending)

  const addPost = () => {
    if(!newPost.title) return alert("Add title")
    setPosts([{ id:Date.now(), title:newPost.title, cat:newPost.cat, img:newPost.img || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800", date:"Just now", trending:true }, ...posts])
    setShowAdmin(false); setNewPost({title:"", cat:"Gist", img:""})
  }

  return (
    <div>
      <div className="bg-[#008751] text-white text-xs md:text-sm py-2 px-4 whitespace-nowrap overflow-hidden">BREAKING NEWS: CBN Announces Policy • Fuel Price Remains Stable • National Assembly Passes Education Bill • Youth Empowerment Program Now Accepting Applications</div>
      
      <header className="flex flex-wrap items-center justify-between p-4 max-w-7xl mx-auto border-b">
        <h1 className="text-2xl font-black text-[#008751]">Uchenna&apos;s Blog</h1>
        <div className="flex gap-2 md:gap-4 text-sm font-bold">
          {["All","Entertainment","Sports","Gist","Jobs","Politics"].map(c => <button key={c} onClick={()=>setCat(c)} className={`${cat===c ? "text-[#008751] border-b-2 border-[#008751]" : ""}`}>{c}</button>)}
        </div>
        <div className="flex gap-2 w-full md:w-auto mt-3 md:mt-0">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search news..." className="border rounded-full px-4 py-1.5 w-full md:w-64 text-sm"/>
          <button onClick={()=>setShowAdmin(true)} className="bg-[#008751] text-white px-4 py-1.5 rounded-full text-sm font-bold">Admin</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {filtered[0] && <div className="relative rounded-2xl overflow-hidden h-[340px] mb-6">
            <img src={filtered[0].img} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end text-white">
              <span className="bg-[#008751] w-fit px-2 py-0.5 text-xs rounded mb-2">{filtered[0].cat}</span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">{filtered[0].title}</h2>
            </div>
          </div>}

          <h3 className="text-xl font-black mb-3 border-l-4 border-[#008751] pl-2">Latest News</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map(p => <div key={p.id} className="border rounded-xl overflow-hidden">
              <img src={p.img} className="h-44 w-full object-cover"/>
              <div className="p-3"><span className="text- bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">{p.cat}</span><h4 className="font-bold text-sm mt-1 leading-snug">{p.title}</h4><p className="text- text-gray-500 mt-1">{p.date} • 3 min read</p></div>
            </div>)}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 h-fit">
          <h3 className="font-black text-lg mb-3">Trending Now 🔥</h3>
          {trending.map((p,i) => <div key={p.id} className="mb-4 pb-3 border-b last:border-0"><p className="text-xs text-gray-500">{i+1}. {p.cat}</p><p className="font-bold text-sm leading-snug">{p.title}</p><p className="text- text-gray-400">{p.date}</p></div>)}
          <div className="bg-white border-2 border-dashed rounded-xl p-6 text-center text-sm text-gray-400 mt-4">AdSense Space</div>
        </div>
      </div>

      {showAdmin && <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <h3 className="font-black text-lg mb-4">Add New Post (Admin)</h3>
          <input value={newPost.title} onChange={e=>setNewPost({...newPost, title:e.target.value})} placeholder="Post Title" className="w-full border rounded-lg p-3 mb-3 text-sm"/>
          <select value={newPost.cat} onChange={e=>setNewPost({...newPost, cat:e.target.value})} className="w-full border rounded-lg p-3 mb-3 text-sm"><option>Entertainment</option><option>Sports</option><option>Gist</option><option>Jobs</option><option>Politics</option></select>
          <input value={newPost.img} onChange={e=>setNewPost({...newPost, img:e.target.value})} placeholder="Image URL (optional)" className="w-full border rounded-lg p-3 mb-4 text-sm"/>
          <div className="flex gap-2"><button onClick={addPost} className="flex-1 bg-[#008751] text-white rounded-lg py-2.5 font-bold">Publish</button><button onClick={()=>setShowAdmin(false)} className="flex-1 bg-gray-100 rounded-lg py-2.5 font-bold">Cancel</button></div>
        </div>
      </div>}

      <footer className="bg-[#008751] text-white text-center py-6 mt-10 text-sm">© 2026 Uchenna&apos;s Blog • My Voice, Nigeria&apos;s Stories</footer>
    </div>
  )
}
