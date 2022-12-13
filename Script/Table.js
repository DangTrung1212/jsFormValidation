// const table = new Table({
//     data : data,
//     parent_element : ""
// })
const data = [{
    email : "trungdang@ga.co",
    name: "trung dang"
},{
    email : "trungdang@ga.co",
    name: "trung dang"
}]
const option = {
    userData : data,
    parentElement: ""
}
class Table {
    constructor(option) {
        this.userData = option.userData
        this.parentElement = document.querySelector(option.parentElement)
        this.className = option.className
        this.main()
    }
    renderTHead() {
            const keys = Object.keys(this.userData[0])
            return keys.map((key) => `<th>${key}</th>`).join("")
    }
    renderTBody() {
        let tBody = ""
        for (let i = 0; i < this.userData.length; i++) {
            let row = Object.values(this.userData[i]).map((value)=>`<td>${value}</td>`).join("")
            tBody = tBody.concat(`<tr>${row}</tr>`)
        }
        return tBody
    }
    main () {
        if (this.userData && this.userData.length) {
            this.parentElement.innerHTML = `
            <table>
                <thead>
                ${this.renderTHead()}
                </thead>
                <tbody>
                ${this.renderTBody()}
                </tbody>
            </table>
            `
            this.parentElement.querySelector("table").classList.add(this.className)
        }
    }
}


