const BaseTemplate = require("../baseTemplate");
const path = require("path");

class NoUpdateTemplate extends BaseTemplate {
    constructor() {
        super(...arguments);
    }

    creatTemplate(errorMes) {
        return new Promise((resolve, reject) => {
            this.errorMes = errorMes;
            this.content = this.getTemplateContent(path.join(__dirname, "./template.html"));
            this.fillTemplate();
            resolve(this.content);
        });
    }

    fillTemplate() {
        this.content = this.content
            .replace(/{{server-ip}}/g, this.serverIP)
            .replace(/{{project-name}}/, this.errorMes.projectName)
            .replace(/{{svn-src}}/, this.errorMes.src);
    }


}

module.exports = new NoUpdateTemplate();