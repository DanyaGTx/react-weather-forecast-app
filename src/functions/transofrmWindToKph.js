const transofrmWindToKph = (speedOfWind) =>{
    return Math.ceil(speedOfWind * 3.6); //скорость проходит в метрчах в секунду 
}
export default transofrmWindToKph;