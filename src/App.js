import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const [weatherimg, setweatherimg] = useState('weather')

  const [input, setinput] = useState('')

  const[location, setlocation] = useState('')
  const[error, seterror] = useState('')

  const [weatherInfo, setWeatherInfo] = useState(null)//temp,humidity,weather,time,temp max, temp min,wind,icon
const setLocation=()=>{
  setlocation(input)
}

useEffect(() => {
  location.length>0 && getWeatherInfo();
  console.log('rerender')
},[location])

  const getWeatherInfo = async () => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c6746ea4595ee6980a757dd07684f7b5&units=metric`)
      .then(res => res.json()).then(data => {
        seterror('')
        console.log(data)
        setWeatherInfo({
          date: new Date(data.dt * 1000).toDateString(), temp: data.main.temp.toFixed(0), tempmax: data.main.temp_max.toFixed(0), tempmin: data.main.temp_min.toFixed(0), humidity: data.main.humidity,
          weather: data.weather[0].main, wind: data.wind.speed, icon: data.weather[0].icon,cloudy:data.clouds.all
        })
      }).catch(err => seterror('Please Enter valid City'))
  }
  return (
    <div className="App">
      <div className='other-info'>
        {/* search bar */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'80%',margin:'auto'}}>
          <input type="text" style={{width:'30rem'}} placeholder="Enter location" onChange={(e)=>{setinput(e.target.value)}} />
            <img style={{ width: '2rem', height: '2rem',cursor:'pointer' }} onClick={setLocation} src="./images/search.png" />
        </div>
        {/* top citys */}
        
        <div className='top-cities'>
          <p onClick={()=>{setlocation('mumbai')}}>Mumbai</p>
          <p onClick={()=>{setlocation('delhi')}}>Delhi</p>
        </div>
        {/* divider */}
        <div style={{width:'80%',margin:'3rem auto',height:'0.1rem',background:'rgba(255,255,255,0.2)'}}></div>
        {/* weather details */}
        {
        (weatherInfo !== null&&error.length===0) ?
          <div className='weather-details'>
          <div className='movemid'> 
            <p>Cloudy</p>
            <p style={{color:'white'}}>{weatherInfo.cloudy}%</p>
          </div>
          <div className='movemid'> 
            <p>Humidity</p>
            <p style={{color:'white'}}>{weatherInfo.humidity}</p>
          </div>
          <div className='movemid'> 
            <p>Wind</p>
            <p style={{color:'white'}}>{weatherInfo.wind}km/hr</p>
          </div>
        </div>: error.length>0 && 
            <h1 style={{color:'#999',margin:'auto',width:'fit-content'}}>{error}</h1>
        }
        
      </div>
      <div className='temp-image'>
        {/* stormy,rainy,cloudy,sunny,windy */}
        <img src={`./images/${weatherimg}.jpg`} alt='weather-img' />
        <div className='overlay'>

          {
            (weatherInfo !== null&&error.length===0) ?
            <div style={{flex:'1'}} className='temp-city'>
              <h1>{weatherInfo.temp}°c</h1>
              <p>Min : {weatherInfo.tempmin}°c  <span style={{marginLeft:'1rem'}}>Max : {weatherInfo.tempmax}°c</span></p>
              <p>{location}</p>
              <p>{weatherInfo.date}</p>
              <div style={{ display: 'flex', width: '7rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <img style={{ background: '#888', width: '2.5rem', height: '2.5rem', borderRadius: '50%', }} src={`http://openweathermap.org/img/wn/${weatherInfo.icon}.png`} />
                <p style={{fontSize:'1.5rem',fontWeight:'lighter'}}>{weatherInfo.weather}</p>
              </div>
            </div> : <div style={{flex:'1'}}></div>

          }
          <div style={{width:'80%',margin:'auto',fontSize:'2rem',fontWeight:'400',color:'#F8EDE3',textShadow:'3px 3px 2px rgba(37, 37, 37, 1)'}}>
            <h1>Weather App</h1>
            
            <p style={{fontSize:'1.2rem',fontWeight:'lighter',color:'#F8EDE3',textShadow:'none'}}>Created by <span ><a style={{fontWeight:'bold',cursor:'pointer',color:'white'}} href='https://github.com/Sameer2244' target={'_blank'}>sameer</a></span></p>
          </div>
        </div>
          
      </div>
    </div>
  );
}

export default App;
