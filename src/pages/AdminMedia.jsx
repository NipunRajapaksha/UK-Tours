import React, { useEffect, useState } from 'react';
import api from '../api/client.js';

export default function AdminMedia(){
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const load = async()=>{ const {data} = await api.get('/media'); setItems(data); };
  useEffect(()=>{ load(); },[]);

  const onUpload = async(e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('file', file);
    form.append('caption', caption);
    await api.post('/media', form, { headers: { 'Content-Type': 'multipart/form-data' }});
    setFile(null); setCaption('');
    await load();
  };

  const onDelete = async(id)=>{ await api.delete(`/media/${id}`); await load(); };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Home Media</h1>
      <form onSubmit={onUpload} className="card space-y-3">
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <input className="input" placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} />
        <button className="btn btn-primary w-full">Upload</button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(i => (
          <div key={i._id} className="card">
            {i.type==='video' ? <video src={i.url} controls className="rounded-xl"/> : <img src={i.url} className="rounded-xl"/>}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">{i.caption}</span>
              <button className="btn btn-outline" onClick={()=>onDelete(i._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
