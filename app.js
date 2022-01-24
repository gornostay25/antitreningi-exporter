{
    function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
    }
    document.body.onload = function(){
        document.body.innerHTML += `<div id="viddown" style="position:fixed;left:10px;bottom:10px;z-index:1000;background:papayawhip;border-radius:50%;cursor:pointer"><svg viewBox="0 0 24 24" width=60 height=60 stroke=currentColor stroke-width=2 fill=none stroke-linecap=round stroke-linejoin=round><circle cx=12 cy=12 r=10></circle><polyline points="8 12 12 16 16 12"></polyline><line x1=12 y1=8 x2=12 y2=16></line></svg></div>`
        let scripts = [...document.querySelectorAll("script[src][defer][async][id]")].map(s=>{
            let src = s.src
            return (src.includes("type=VIDEO") && src.includes("student/files/embed"))?src:undefined
        }).filter(e=>!!e)
        document.getElementById("viddown").onclick = async e=>{
            document.getElementById("viddown").style.backgroundColor="red"
            let name = document.querySelector(".lesson_name_container").innerText.replaceAll("\n"," "),
            links = [],
            n=0
            for (const s of scripts) {
                let fd = await fetch(s).then(d=>d.text()),
                link = fd.match(/src=\\"(.*?)\\"/)[1] || ""
                links.push([link,((n>0)?`${name} (${n})`:name)])
                n+=1
            }
            document.getElementById("viddown").style.backgroundColor="green"
            let w = open("")
            links = links.filter(l=>!!l).map(lnk=>{
                lnk[0] = location.origin+lnk[0]
                return lnk
            })
            w.document.body.innerHTML =`videos:
            <hr>
            `+links.map(l=>{
                return l[1]+`&emsp;<a target="_blank" download="${uuidv4()}.mp4" href="${l[0]}">download</a><br>${l[0]}<br><br>`
            }).join("") 
            w.document.body.innerHTML += `<a href="http://localhost:8080/add?data=${encodeURIComponent(JSON.stringify(links))}">Add to downloader</a>`
        }
    }
}