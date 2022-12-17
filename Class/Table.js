
class Table {
    constructor(option) {
        this.userData = option.userData
        this.parentElement = document.querySelector(option.parentElement)
        this.className = option.className
        this.keys = Object.keys(this.userData[0])
        this.numberOfColumns = option.numberOfColumns || this.keys.length
        this.main()
    }
    renderTHead() {
            return this.keys.map((key,index) => {
                if (index < this.numberOfColumns)
                    return `<th>${key}</th>`}
            ).join("")
    }
    renderTBody() {
        let tBody = ""
        for (let i = 0; i < this.userData.length; i++) {
            let row = Object.values(this.userData[i]).map((value,index)=> {
                if (index < this.numberOfColumns) {
                    return `<td>${value}</td>`
                }
            }).join("")
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
            console.log(this.renderTBody())
            this.parentElement.querySelector("table").classList.add(this.className)
        }
    }
}


