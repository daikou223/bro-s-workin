import React,{useState,useEffect} from "react";
import styles from './main.css';
function Select(){
    const[select,setSelect] = useState(Array(32).fill(0));
    var items = [];
    const go = ["-","5:36","6:09","6:09","10:03","11:11","11:11","19:38"];
    const sta = ["-","6:30","7:00","7:00","11:00","12:00","12:00","21:00"];
    const end = ["-","15:30","16:00","16:00","20:00","21:00","21:00","翌7:00"];
    const home = ["-","16:20","16:59","16:59","21:04","21:53","21:53","翌7:55"];
    var tbl = [];
    var days = [];
    let scr = [];
    const chan = function(n,v){
        let bebut = document.getElementById(`${n}${select[n]}`);
        bebut.style.backgroundColor = "rgb(206, 201, 201)";
        const newSelect = [...select];
        newSelect[n] = v;
        let afbut = document.getElementById(`${n}${v}`);
        afbut.style.backgroundColor = "yellow";
        setSelect(newSelect);
    }
    const chang = function(v){
        const newSelect = [...select];
        newSelect[31] = v;
        setSelect(newSelect);
    }
    for(let i = 0;i<31;i++){
        items.push(
        <tr key = {i}>
        <td>{i+1}</td><td><button onClick={()=>chan(i,1)} id={`${i}1`} >A</button></td>
        <td><button onClick={()=>chan(i,2)}id={`${i}2`}>B</button></td>
        <td><button onClick={()=>chan(i,3)}id={`${i}3`}>C</button></td>
        <td><button onClick={()=>chan(i,4)}id={`${i}4`}>D</button></td>
        <td><button onClick={()=>chan(i,5)}id={`${i}5`}>E</button></td>
        <td><button onClick={()=>chan(i,6)}id={`${i}6`}>F</button></td>
        <td><button onClick={()=>chan(i,7)}id={`${i}7`}>夜</button></td>
        <td><button onClick={()=>chan(i,0)}id={`${i}0`} class="non">なし</button></td>
        </tr>);
        console.log(items[i]);
    }
    days.push(
        <tr>
        <td>一日の曜日</td><td><input type = "radio" name = "31" value = "1"onChange={()=>chang(1)}/>月</td>
        <td><input type = "radio" name = "31"value = "2" onChange={()=>chang(2)}/>火</td>
        <td><input type = "radio" name = "31"value = "3" onChange={()=>chang(3)}/>水</td>
        <td><input type = "radio" name = "31"value = "4"onChange={()=>chang(4)}/>木</td>
        <td><input type = "radio" name = "31"value = "5"onChange={()=>chang(5)}/>金</td>
        <td><input type = "radio" name = "31"value = "6"onChange={()=>chang(6)}/>土</td>
        <td><input type = "radio" name = "31"value = "0"onChange={()=>chang(0)}/>日</td>
        </tr>);
    var you = ["昼","月","火","水","木","金","土"];
    for(let j = 0;j<31;j++){
        console.log((select[31]+j)%7,select[j]);
        if((select[31]+j)%7>=1 && (select[31]+j)%7<=5){
        tbl.push(
            <tr>
                <td>{j+1}</td><td>{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td>
            </tr>
        )
    }
    else if((select[31]+j)%7===0){
        tbl.push(
            <tr>
                <td>{j+1}</td><td className = "red">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td>
            </tr>
        )
    }
    else if((select[31]+j)%7===6){
        tbl.push(
            <tr>
                <td>{j+1}</td><td className = "blue">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td>
            </tr>
        )
    }
    }
    return(
        <div className = "Select">
            <div className = "scr">
            <table>
                {days}
            </table>
            </div>
            <table>
                <tr><td>
            <div className = "scr">
            <table>
            {items}
            </table>
            </div>
            </td><td>
            <table className = "prt">
                <tr><th>日付</th><th>曜日</th><th>駅出発</th><th>開始</th><th>終了</th><th>帰宅</th><th className="memo">メモ</th></tr>
            {tbl}
            </table>
            </td>
            </tr>
            </table>
            <button className = "print"onClick={()=>window.print()}>印刷</button>
        </div>
    )
}

export default Select