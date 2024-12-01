import React,{useState,useEffect} from "react";
import styles from './main.css';
function Select(){
    const[select,setSelect] = useState(Array(32).fill(8)); /* 選んだものを保管する */
    useEffect(()=>{
        const newSelect = [...select];
        newSelect[31] = 8;   /* 曜日選択を8番にし，更新 */
        setSelect(newSelect);
    },[])
    var items = []; /* ボタンオブジェクトを保管 */
    const go = ["-","5:15","5:45","5:45","9:45","10:45","10:45","19:45"]; //各時刻を保管する
    const sta = ["-","6:30","7:00","7:00","11:00","12:00","12:00","21:00"];
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
    for(let i = 0;i<31;i++){ /* ボタンを設置 */
        items.push(
        <tr key = {i}>
        <td>{i+1}日</td>
        <td className = "prev">{you[(select[31]+i)%7]}</td>
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
    for(let j = 0;j<31;j++){
        if(select[j] <= 7){ /* 入力されていないなら行を作らない */
            if((select[31]+j)%7>=1 && (select[31]+j)%7<=5){ /* 平日ならば */
                tbl.push(
                    <tr>
                        <td>{j+1}</td><td>{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td>
                    </tr>
                )
            }else if((select[31]+j)%7===0){ /* 日ならば */
                if(select[j] <= 6 && select[j] >= 1){
                tbl.push(
                    <tr>
                        <td>{j+1}</td><td className = "red">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td>お昼忘れずに</td>
                    </tr>
                )}
                else{
                    tbl.push(
                        <tr>
                            <td>{j+1}</td><td className = "red">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td>
                        </tr>
                    )
                }
            }else if((select[31]+j)%7===6){ /* 土ならば */
                tbl.push(
                    <tr>
                        <td>{j+1}</td><td className = "blue">{you[(select[31]+j)%7]}</td><td>{go[select[j]]}</td><td>{sta[select[j]]}</td><td>{end[select[j]]}</td><td>{home[select[j]]}</td><td></td>
                    </tr>
                )
            }
         }
    };
    function plt(){
        let als = [];
        let okNg = true;
        for(let i = 0;i<31;i++){
            if(select[i] == 8){
                als.push(i+1)
            }
        }
        if(als.length != 0){
            okNg = window.confirm(als.join("日 ")+"日が選択されていませんがよろしいですか？");
            console.log(okNg);
        };
        if(select[31] === 8){
            okNg = window.confirm("1日の曜日が選択されていません(デフォルトは月)") && okNg;
            console.log(okNg);
        };
        if(okNg){
            window.print();
        }
    }
    return(
        <div className = "Select">
            <div className = "message">
                <p>アップデート情報</p>
                <div class = "date">
                <div>2024/10/11</div>
                <p>一日の曜日が選択されてない場合に確認画面の表示．</p>
                <p>アップデート情報の表示</p>
                </div>
                <div class = "date">
                <div>2024/11/22</div>
                <p>通信費を払ったかどうかを追加</p>
                <p>曜日を昼から日に変更し，メモにその旨を追加</p>
                </div>
            </div>
            <div className = "scr">
                {days}
            </div>
            <div className = "scr">
            <table>
            {items}
            </table>
            </div>
            <button className = "print"onClick={()=>{plt()}}>印刷</button>
            <div className = "prt">
            <table>
                <tr><td>通信費</td><td>だい</td><td className = "wide"></td><td>こう</td><td lassName = "wide"></td></tr>
            </table>
            </div>
            <table className = "prt">
                <tr><th>日付</th><th>曜日</th><th>家出発</th><th>開始</th><th>終了</th><th>帰宅</th><th className="memo">メモ</th></tr>
            {tbl}
            </table>
        </div>
        )
    }

export default Select