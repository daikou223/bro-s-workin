import React,{useState,useEffect} from "react";
import styles from './main.css';
function Select(){
    const[select,setSelect] = useState(Array(32).fill(0));
    var items = [];
    const go = ["-","5:36","6:09","6:09","10:03","11:11","11:11","19:38"];
    const sta = ["-","6:30","7:00","7:00","11:00","12:00","12:00","21:00"];
    const end = ["-","15:30","16:00","16:00","20:00","21:00","21:00","翌日7:00"];
    const home = ["-","16:20","16:59","16:59","21:04","21:53","21:53","翌日7:55"];
    var tbl = [];
    var days = [];
    const chan = function(n,v){
        const newSelect = [...select];
        newSelect[n] = v;
        setSelect(newSelect);
    }
    for(let i = 0;i<31;i++){
        items.push(
        <tr key = {i}>
        <td>{i+1}</td><td><input type = "radio" name = {i} value = "1"onChange={()=>chan(i,1)}/>A</td>
        <td><input type = "radio" name = {i}value = "2" onChange={()=>chan(i,2)}/>B</td>
        <td><input type = "radio" name = {i}value = "3" onChange={()=>chan(i,3)}/>C</td>
        <td><input type = "radio" name = {i}value = "4"onChange={()=>chan(i,4)}/>D</td>
        <td><input type = "radio" name = {i}value = "5"onChange={()=>chan(i,5)}/>E</td>
        <td><input type = "radio" name = {i}value = "6"onChange={()=>chan(i,6)}/>F</td>
        <td><input type = "radio" name = {i}value = "7"onChange={()=>chan(i,7)}/>夜</td>
        <td><input type = "radio" name = {i}value = "0"onChange={()=>chan(i,0)}/>なし</td>
        </tr>);
    }
    days.push(
        <tr>
        <td>一日の曜日</td><td><input type = "radio" name = "31" value = "1"onChange={()=>chan(31,1)}/>月</td>
        <td><input type = "radio" name = "31"value = "2" onChange={()=>chan(31,2)}/>火</td>
        <td><input type = "radio" name = "31"value = "3" onChange={()=>chan(31,3)}/>水</td>
        <td><input type = "radio" name = "31"value = "4"onChange={()=>chan(31,4)}/>木</td>
        <td><input type = "radio" name = "31"value = "5"onChange={()=>chan(31,5)}/>金</td>
        <td><input type = "radio" name = "31"value = "6"onChange={()=>chan(31,6)}/>土</td>
        <td><input type = "radio" name = "31"value = "0"onChange={()=>chan(31,0)}/>日</td>
        </tr>);
    var you = ["日","月","火","水","木","金","土"];
    for(let j = 0;j<31;j++){
        console.log((select[31]+j)%7,select[j]);
        if((select[31]+j)%7>=1 && (select[31]+j)%7<=5){
        tbl.push(
            <tr>
                <td>{j+1}</td><td>{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td>
            </tr>
        )
    }
    else if((select[31]+j)%7===0){
        tbl.push(
            <tr>
                <td>{j+1}</td><td className = "red">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td>
            </tr>
        )
    }
    else if((select[31]+j)%7===6){
        tbl.push(
            <tr>
                <td>{j+1}</td><td className = "blue">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td>
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
            <table>
            {items}
            </table>
            {select}
            </div>
            <table className = "prt">
                <tr><th>日付</th><th>曜日</th><th>駅出発</th><th>開始</th><th>終了</th><th>帰宅</th></tr>
            {tbl}
            </table>
        </div>
    )
}

export default Select