
const test = () =>{
    try {
        const result = JSON.parse('[3]')
        console.log(result)
    } catch (error) {
        console.log(`err: ${error}`)
    }
}
test()

const test2 = () => {
    JSON.parse('323').catch(err => {
        console.log(err)
    })
}
test2()