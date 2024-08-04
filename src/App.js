import React,{useState,useEffect} from "react";
function App() {
  const [Sumple,setSumple] = useState([]);
  const [Days,setDays] = useState([]);
  const [select,setSelect] = useState([]*31);
  const items = [];
  const data = Array(32).fill("x");
  const changeValue = function(num,value){
    const newData = [...select]; 
    newData[num] = value;
    setSelect(newData);
  };
  for(var i = 0;i<32;i++){
  console.log(data[i])
  }
  useEffect(()=>{
  i = 31;
  setDays(
  <tr>
  <td><input type="radio" name="days" value="月" onchange = {()=>changeValue(i,"月")} checked= {data[i] === "月"}/>月</td>
  <td><input type="radio" name="days" value="火" onchange = {()=>changeValue(i,"火")} checked= {data[i] === "火"}/>火</td>
  <td><input type="radio" name="days" value="水" onchange = {()=>changeValue(i,"水")} checked= {data[i] === "水"}/>水</td>
  <td><input type="radio" name="days" value="木" onchange = {()=>changeValue(i,"木")} checked= {data[i] === "木"}/>木</td>
  <td><input type="radio" name="days" value="金" onchange = {()=>changeValue(i,"金")} checked= {data[i] === "金"}/>金</td>
  <td><input type="radio" name="days" value="土" onchange = {()=>changeValue(i,"土")} checked= {data[i] === "土"}/>土</td>
  <td><input type="radio" name="days" value="日" onchange = {()=>changeValue(i,"日")} checked= {data[i] === "日"}/>日</td></tr>);
  for(i = 0; i<31;i++){
    items.push(<tr>
    <td>{i+1}日</td>
    <td><input type="radio" name={i} value="A" onchange = {()=>changeValue(i,"A")} checked= {data[i] === "A"}/>A</td>
    <td><input type="radio" name={i} value="B" onchange = {()=>changeValue(i,"B")} checked= {data[i] === "B"}/>B</td>
    <td><input type="radio" name={i} value="C" onchange = {()=>changeValue(i,"C")} checked= {data[i] === "C"}/>C</td>
    <td><input type="radio" name={i} value="D" onchange = {()=>changeValue(i,"D")} checked= {data[i] === "D"}/>D</td>
    <td><input type="radio" name={i} value="E" onchange = {()=>changeValue(i,"E")} checked= {data[i] === "E"}/>E</td>
    <td><input type="radio" name={i} value="F" onchange = {()=>changeValue(i,"F")} checked= {data[i] === "F"}/>F</td>
    <td><input type="radio" name={i} value="夜"onchange = {()=>changeValue(i,"夜")} checked= {data[i] === "夜"}/>夜</td>
    <td><input type="radio" name={i} value="x" onchange = {()=>changeValue(i,"x")} checked= {data[i] === "x"}/>なし</td></tr>);
  }
  setSumple(items);
},[select]);
  return (
    <div className="App">
      <div className="scr">
      <h1>勤務予定表 設定</h1>
      <h2>一日の曜日</h2>
      {Days}<br/>
      <table>
    {Sumple}
    </table>
    {select}
    </div>
    </div>
  );
}

export default App;
