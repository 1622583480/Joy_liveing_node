const { processing } = require("./UserSql");

function like() {
    return new Promise((reslove, reject) => {
        let sql = `select * from home_life`;
        processing([], sql, data => {
            data.forEach((item, index) => {
                if (!(item.type === null)) {
                    data.splice(index, 1)
                }
                item.img_list = item.img_list.replace(/\"/g, "");
                item.img_list = item.img_list.replace(/\'/g, "");
                item.img_list = item.img_list.replace(/\[/g, "");
                item.img_list = item.img_list.replace(/\]/g, "");
                item.img_list = item.img_list.split(',')
            });
            new Promise((ress, rejj) => {
                let resultes = []
                let num = 30;
                for (let i = 0; i < num; i++) {
                    // console.log(i)
                    let suiji = Math.random().toFixed(2).slice(-2)
                    if (suiji[0] == "0") {
                        suiji = suiji[1]
                    }
                    resultes.push(data[suiji])
                }
                ress(resultes)
            }).then(res => {
                console.log(res.length
                    )
                reslove({ code: 204, data: res })
            }).catch(err => {
                console.log(err)
            })
        })
    })
}
module.exports = {
    like
}