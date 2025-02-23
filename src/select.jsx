import React,{useState,useEffect} from "react";
import styles from './main.css';
import axios from "axios";
function Select(){
    const[select,setSelect] = useState(Array(32).fill(0)); /* 選んだものを保管する */
    const[buttonName,setButtonName] = useState("印刷");
    const today = new Date();
    const monthLastDay = new Date(today.getFullYear(),today.getMonth()+2,0);
    const monthFirstDay = new Date(today.getFullYear(),today.getMonth()+1,1);
    useEffect(()=>{
        const newSelect = [...select];
        newSelect[31] = monthFirstDay.getDay();   /* 曜日選択を8番にし，更新 */
        setSelect(newSelect);
    },[])
    function formatTime(input) {
        const parts = input.split(':');
        const hours = parts[0].padStart(2, '0');
        const minutes = (parts[1] || '00').padStart(2, '0');
        const seconds = (parts[2] || '00').padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    var items = []; /* ボタンオブジェクトを保管 */
    const go = ["-","5:15","5:45","5:45","9:45","10:45","10:45","19:15"]; //各時刻を保管する
    const sta = ["-","6:30","7:00","7:00","11:00","12:00","12:00","20:30"];
    const end = ["-","15:30","16:00","16:00","20:00","21:00","21:00","翌7:00"];
    const home = ["-","16:40","17:10","17:10","21:10","22:10","22:10","翌8:10"];
    var tbl = []; /* テーブルの結果を保管する */
    var days = []; /*曜日のボタンオブジェクトを保管 */
    var you = ["日","月","火","水","木","金","土"]; /* 曜日名を保管 */
    const chan = function(n,v){ /* ボタンを押したときの変更処理 */
        if(select[n] <= 7){ /* 今まで押されてた場合に色を戻す処理 */
        let bebut = document.getElementById(`${n}${select[n]}`);
        bebut.style.backgroundColor = "rgb(206, 201, 201)";
        }
        const newSelect = [...select]; /* selectの変更処理 */
        newSelect[n] = v;
        let afbut = document.getElementById(`${n}${v}`);
        afbut.style.backgroundColor = "yellow"; /* 選択したものを黄色に */
        setSelect(newSelect);
    }
    const chang = function(v){ /* 一日目の曜日の変更は別処理 */
        const newSelect = [...select];
        newSelect[31] = v;
        setSelect(newSelect);
    }
    for(let i = 0;i<monthLastDay.getDate();i++){ /* ボタンを設置 */
        items.push(
        <tr key = {i}>
        <td>{i+1}日</td>
        <td className = "prev">{you[(monthFirstDay.getDay()+i)%7]}</td>
        <td><button onClick={()=>chan(i,1)} id={`${i}1`} >A</button></td>
        <td><button onClick={()=>chan(i,2)}id={`${i}2`}>B</button></td>
        <td><button onClick={()=>chan(i,3)}id={`${i}3`}>C</button></td>
        <td><button onClick={()=>chan(i,4)}id={`${i}4`}>D</button></td>
        <td><button onClick={()=>chan(i,5)}id={`${i}5`}>E</button></td>
        <td><button onClick={()=>chan(i,6)}id={`${i}6`}>F</button></td>
        <td><button onClick={()=>chan(i,7)}id={`${i}7`}>夜</button></td>
        <td><button onClick={()=>chan(i,0)}id={`${i}0`} class="non">なし</button></td>
        </tr>);
    }
    days.push( /* 曜日のボタンを設置 */
        <tr>
        <td>一日の曜日</td>
        <td><input type = "radio" name = "31" value = "1"onChange={()=>chang(1)}/>月</td>
        <td><input type = "radio" name = "31"value = "2" onChange={()=>chang(2)}/>火</td>
        <td><input type = "radio" name = "31"value = "3" onChange={()=>chang(3)}/>水</td>
        <td><input type = "radio" name = "31"value = "4"onChange={()=>chang(4)}/>木</td>
        <td><input type = "radio" name = "31"value = "5"onChange={()=>chang(5)}/>金</td>
        <td><input type = "radio" name = "31"value = "6"onChange={()=>chang(6)}/>土</td>
        <td><input type = "radio" name = "31"value = "0"onChange={()=>chang(0)}/>日</td>
        </tr>);
    /* 表を実態にする */
    for(let j = 0;j<monthLastDay.getDate();j++){
        if(select[j] <= 7){ /* 入力されていないなら行を作らない */
            if((select[31]+j)%7>=1 && (select[31]+j)%7<=5){ /* 平日ならば */
                tbl.push(
                    <tr>
                        <td>{j+1}</td><td>{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td><td><Titi/></td>
                    </tr>
                )
            }else if((select[31]+j)%7===0){ /* 日ならば */
                if(select[j] <= 6 && select[j] >= 1){
                tbl.push(
                    <tr>
                        <td>{j+1}</td><td className = "red">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td>お昼忘れずに</td><td><Titi/></td>
                    </tr>
                )}
                else{
                    tbl.push(
                        <tr>
                            <td>{j+1}</td><td className = "red">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td><td><Titi/></td>
                        </tr>
                    )
                }
            }else if((select[31]+j)%7===6){ /* 土ならば */
                tbl.push(
                    <tr>
                        <td>{j+1}</td><td className = "blue">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td><td><Titi/></td>
                    </tr>
                )
            }
         }
    };
    function plt(){
        setButtonName("保存中");
        const printingButton = document.getElementById("print");
        printingButton.disabled = true;
        let querys = [];
        let paramses = [];
        for(let i = 0;i<monthLastDay.getDate();i++){
            if(select[i] === 7){
                querys.push("INSERT INTO `task`(`user_id`, `taskname`, `forgoto`, `date`, `start`, `end`, `memo`) VALUES (?,?,?,?,?,?,?)")
                paramses.push([2,"夜勤仕事",formatTime("1:15"),`${String(monthFirstDay.getFullYear()).padStart(2,'0')}-${String(monthFirstDay.getMonth()+1).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`,formatTime(sta[select[i]]),"23:59:59",""]);
                let tommorw = new Date(monthFirstDay.getFullYear(),monthFirstDay.getMonth(),i+2)
                querys.push("INSERT INTO `task`(`user_id`, `taskname`, `forgoto`, `date`, `start`, `end`, `memo`) VALUES (?,?,?,?,?,?,?)")
                paramses.push([2,"夜勤仕事",formatTime("1:15"),`${String(tommorw.getFullYear()).padStart(2,'0')}-${String(tommorw.getMonth()+1).padStart(2,'0')}-${String(tommorw.getDate()).padStart(2,'0')}`,"00:00:00","07:00:00",""]);
            }
            else if(select[i] != 0){
                querys.push("INSERT INTO `task`(`user_id`, `taskname`, `forgoto`, `date`, `start`, `end`, `memo`) VALUES (?,?,?,?,?,?,?)")
                paramses.push([2,"仕事",formatTime("1:15"),`${String(monthFirstDay.getFullYear()).padStart(2,'0')}-${String(monthFirstDay.getMonth()+1).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`,formatTime(sta[select[i]]),formatTime(end[select[i]]),""]);
            }
        }
        console.log(querys,paramses);
        for(let day = 0;day<querys.length/10+1;day++){
            axios.post(`https://fam-api-psi.vercel.app/api/month`,{
                querys:querys.slice(day*10,day*10+10),
                paramses:paramses.slice(day*10,day*10+10)
            }).then(()=>{
                console.log("成功");
                printingButton.disabled = false;
                setButtonName("印刷");
                }
            ).catch((e)=>{
                console.log("error",e);
            }
            );
        }
        window.print();
    }
    return(
        <div className = "Select">
            <div className = "scr">
                {today.getMonth()+2}月分
            <table>
            {items}
            </table>
            </div>
            <button className = "print" id = "print" onClick={()=>{plt()}}>{buttonName}</button>
            <div className = "prt">
            <table>
                <tr><td>通信費</td><td>だい</td><td className = "wide"></td><td>こう</td><td lassName = "wide"></td></tr>
            </table>
            </div>
            <table className = "prt">
                <tr><th className = "day">日</th><th className = "day">曜</th><th>出発</th><th>開始</th><th>終了</th><th>帰宅</th><th className="memo">メモ</th><th className="titi">父勤務</th></tr>
            {tbl}
            </table>
        </div>
        )
    }

    function Titi(){
        return(
            <div>
                <a>O-S</a>
                <a className = "Lmargin">O-L</a>
                <a className = "Lmargin">O-無</a>
            </div>
        )
    }
export default Select