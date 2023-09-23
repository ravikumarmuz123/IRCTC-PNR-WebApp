var apiKey='54b78a1733msh6f98975dddd702dp188788jsn2755e40e9e90';
setInterval(clock,1000);
function clock(){
    var d = new Date();
    document.getElementById('clock').innerText=`[ ${d.toLocaleTimeString()} ]`;
}


function runPNRFunc(){
    document.getElementById('search-ctr').innerHTML=`<h1>IRCTC PNR Status</h1>
    <input type="text" id="inputPNR" placeholder="Enter 10 digit PNR Number">
    <button onclick="CheckPnrStatus_Click()" class="main-btn">Check PNR Status</button>`;
}
function runSeatFunc(){
    alert('Funtion Under Maintainance');
}
function runScheduleFunc(){
    document.getElementById('search-ctr').innerHTML=`<h1>Get Train Schedule</h1>
    <input type="text" id="inputTrainNo" placeholder="Enter Train Number">
    <button onclick="" class="main-btn">Get Schedule</button>`;
}
function runRunningFunc(){
    document.getElementById('search-ctr').innerHTML=`<h1>Train Running Status</h1>
    <input type="text" id="inputTrainNo" placeholder="Enter Train Number">
    <button onclick="" class="main-btn">Get Status</button>`;
}


// PNR Search Result Function

function CheckPnrStatus_Click(){
    var pnr = document.getElementById('inputPNR').value;
    checkPnrStatus(pnr);
}
function afterResponseCallBack(){
    var responseData=this.response;
    if(responseData.status==true){
        var pnrData = responseData.data;
        var ticketDetails = `<table id="ticketDetails">
        <caption>Search Result For PNR : ${pnrData.Pnr}</caption>
        <tr>
            <th style="width: 100px;">Train Number</th>
            <th style="width: 200px;">Train Name</th>
            <th style="width: 110px;">Boarding Date</th>
            <th style="width: 50px;">From</th>
            <th style="width: 50px;">To</th>
            <th style="width: 125px;">Researved Upto</th>
            <th style="width: 120px;">Boarding Station</th>
            <th style="width: 50px;">Class</th>
        </tr>
        <tr>
            <td>${pnrData.TrainNo}</td>
            <td>${pnrData.TrainName}</td>
            <td>${pnrData.Doj}</td>
            <td>${pnrData.From}</td>
            <td>${pnrData.To}</td>
            <td>${pnrData.ReservationUpto}</td>
            <td>${pnrData.BoardingPoint}</td>
            <td>${pnrData.Class}</td>
        </tr>
        </table>`;

        var passDetails = `<table id="passangerDetails">
        <caption>Passanger Details</caption>
        <tr>
            <th style="width: 125px;">Serial No.</th>
            <th style="width: 350px;">Booking Status (Coach, Berth, Quota)</th>
            <th style="width: 350px;">Current Status</th>
        </tr>`;

        for(var i=0 ; i<pnrData.PassengerStatus.length ; i++){
            passDetails += `<tr>
                <td>Passanger ${pnrData.PassengerStatus[i].Number}</td>
                <td>${pnrData.PassengerStatus[i].BookingStatus}</td>
                <td>${pnrData.PassengerStatus[i].CurrentStatusNew}</td>
            </tr>`;
        }
        passDetails += `</table>`;

        var ChartingStatus;
        if(pnrData.ChartPrepared==true){
            ChartingStatus='Chart Prepared';
        }
        if(pnrData.ChartPrepared==false){
            ChartingStatus='Chart Not Prepared';
        }

        var otherDetails = `<table id="otherDetails">
        <tr>
            <th style="width: 120px;">Ticket Fare</th>
            <th style="width: 250px;">Charting Status</th>
            <th style="width: 280px;">Remark (if any)</th>
            <th style="width: 175px;">Train Status</th>
        </tr>
        <tr>
            <td>Rs. ${pnrData.TicketFare}/-</td>
            <td>${ChartingStatus}</td>
            <td></td>
            <td>${pnrData.TrainStatus}</td>
        </tr>
        </table>`;

        var displayData = ticketDetails+passDetails+otherDetails;
        document.getElementById('searchResult-ctr').innerHTML=displayData;
    }
    else{
        document.getElementById('searchResult-ctr').innerHTML="ERROR : Please Check The PNR Number";
    }
    
}
function checkPnrStatus(pnr){
    var r=new XMLHttpRequest();
    r.open('GET',`https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${pnr}`);
    r.responseType='json';
    r.setRequestHeader('X-RapidAPI-Key', apiKey);
    r.setRequestHeader('X-RapidAPI-Host', 'irctc1.p.rapidapi.com');
    r.onload=afterResponseCallBack;
    r.send();
}


