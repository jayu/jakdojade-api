const axios = require('axios')
const { getHeaders } = require('./jakdojadecredentials.js')
const registerUser = async (deviceID) => {
	return axios({
		method : 'POST',
		url : 'https://jakdojade.pl/api/profiles/v1/register-anonymous', 
		headers : {
			"X-jd-param-appV" : "web",
			"X-jd-param-user-device-id" : deviceID,
			"X-jd-param-locale": "pl"
		}
	}).then((user) =>{
		return user.data
	})
	 .catch((e) => {
	 	console.log(e)
	 })
}
const getResource = async (url, headers) => {
	return axios({
		method : 'GET',
		url,
		headers : {
			...headers,
			'Host' : 'jakdojade.pl',			
			'Referer': url
		}
	}).then((res) =>{
		return res.data
	})
	 .catch((e) => {
	 	console.log(e.response.data)
	 })	
}
const find = async (citySymbol, startCoords, endCoords, date, time, isArrivalTime, routesCount) => {
	const deviceID = `fake_device_id`
	const user = await registerUser(deviceID)
	const url = `https://jakdojade.pl/api/web/v1/routes?aac=true&alt=0&apv=&fc=${startCoords}&region_symbol=${citySymbol}&rt=false&t=optimal&tc=${endCoords}&rc=${routesCount}&time=${date}+${time}&ia=${isArrivalTime}`
	const headers = await getHeaders(url, user.userProfile, deviceID)
	const result = await getResource(url, headers)
	const transformed_results = result.routes.map((route => {
		const line = route.routeParts[1].routeLine.line
		return {
			departure : route.routeParts[1].routePartStartDepartureTimeSchedule,
			arrival : route.routeParts[1].routePartTargetArrivalTimeSchedule,
			time : ~~(((new Date(route.routeParts[1].routePartStartDepartureTimeSchedule).getTime()) - Date.now())/(1000*60)),
			line : line.lineName,
			type : line.lineVehicleType,
		}
	}))
	return transformed_results
}

const add0 = (value) => {
	return (''+value).length == 1 ? '0' + value : value
}
const getDate = (date) => {
	return `${add0(date.getDate())}.${add0(date.getMonth()+1)}.${date.getYear()%100}`
}
const getTime = (date) => {	
	return `${add0(date.getHours())}:${add0(date.getMinutes())}`
}
const mergeCoords = (latlng) => {
	return `${latlng.lat}:${latlng.lng}`
}
module.exports = { findRoutes : async (citySymbol, startPointCoords, endPointCoords, dateTime, isArrivalTime = false, routesCount=3) => {
	return await find(citySymbol, mergeCoords(startPointCoords), mergeCoords(endPointCoords), getDate(dateTime), getTime(dateTime), isArrivalTime,routesCount)
}}

