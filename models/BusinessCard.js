//Person
const firstNames = ['Kyra','James','Andrea','Rob','Brandon','Rapheal','Jessie','Cindy','Warren','Jack'];
const lastNames = ['Davis','Downs','Estrada','Franco','Pullen','Dabney','Wooten','Escobar','Cardenas','Sadler','Sandler'];
const roles = ['Salesman', 'CTO','CFO','CEO','Customer Service','Owner']
//Business
const titles = ['Big ', 'Lil ','Dr ',''];
const adjectives = ['Big Ol', 'Perfect', 'Budget','Luxury','Rock Solid', 'Top Notch', 'Extravagant', 'Family', 'Discount','Rental',''];
const nouns = ['Rocks','Signs','Pizza','Fans','Bakery','Landscaping','Services','Cleaning', 'Brakes','Private Investigation'];
const companyType =[', INC', ', LLC',', Co', '']
const domainTypes = ['com','net','org']
const areaCodes = ['615','650','202','310','917','718','512','312','415','305','617'];
const backgroundImageURLs = [
    'https://png.pngtree.com/thumb_back/fh260/back_pic/04/32/47/035843e833dd111.jpg',
    'https://4.bp.blogspot.com/-TfAoDf4nxPc/WIilghcBpLI/AAAAAAAABD8/3k6ConNzqR86xhcdfq6KofBrOrwJnEi2gCEw/s1600/52.png',
    'http://hydraexecutives.com/wp-content/uploads/2018/11/business-card-background-new-pattern-texture-light-black-background-simple-abstract-business-of-business-card-background.jpg',
    'https://png.pngtree.com/thumb_back/fw800/back_pic/04/32/91/8958444b41dd6e7.jpg',
    'https://cdn2.f-cdn.com/contestentries/363516/17438717/56dc581e39e9e_thumb900.jpg',
    'http://astcompany.info/wp-content/uploads/2019/02/blank-business-card-design-template-visiting-background-photoshop-visitin.jpg',
    'http://frakka.co/wp-content/uploads/2018/12/abstract-shape-design-for-background-template-business-presentation-background-vector-illustration-abstract-shape-design-for-background-template-business-presentation-floral-background-business-card-t.jpg',
    'http://ereports.co/wp-content/uploads/2019/01/business-background-template-abstract-black-and-gold-wave-business-background-design-template-white-background-business-card-template.jpg',
    'https://png.pngtree.com/thumb_back/fw800/back_pic/03/93/83/1657e775446eefc.jpg',
    'http://creativeoverflow.net/wp-content/uploads/2009/10/step1.jpg'
]
 
 module.exports = class BusinessCard {
     constructor(options={contact:{phoneNumber:{}},background:{}}) {
        this.businessName = options.businessName || BusinessCard.generateBusinessName(),
        this.name = options.name || BusinessCard.generateName(),
        this.titles = options.titles || BusinessCard.generateRoles(),
        this.contact = {
            email: options.contact.email || BusinessCard.generateEmail(this.name, this.businessName),
            phoneNumber: {
            areaCode: options.contact.phoneNumber.areaCode || BusinessCard.getRandomItem(areaCodes),
            number: options.contact.phoneNumber.number || BusinessCard.generatePhoneNumber()
            }
        },
        this.background = {
            imgURL: options.background.imgURL || BusinessCard.generateBackgroundImg(),
            color: options.background.backgroundColor || BusinessCard.getRandomColor()
        }
     }
    
    static generateName() {
        const firstName = this.getRandomItem(firstNames);
        const lastName = this.getRandomItem(lastNames);
        return `${firstName} ${lastName}`;
    }
    
    static generateBusinessName() {
        let owner = this.getRandomItem([...firstNames,...lastNames, '']);
        if(owner) owner = this.getRandomItem(titles) + owner +  "'s";
        let businessName = `${this.getRandomItem(adjectives)} ${this.getRandomItem(nouns)}`
        let type = this.getRandomItem(companyType);
        return `${owner} ${businessName}${type}`;     
    }
    static generateRoles() {
        const num_of_roles = this.getRandomNumber(2) + 1; //between 1 - 3
        let titles = [];
        while (titles.length < num_of_roles) {
            let role = this.getRandomItem(roles);
            if(!titles.includes(role)) titles.push(role);
        }
        return titles;
    }
    static generateEmail(name, businessName) {
        let username = name.split(' ').join('.');
        let domain = businessName.split(' ').join('').toLowerCase().replace("'",'').replace(',','');
        let ending = this.getRandomItem(domainTypes);
        return `${username}@${domain}.${ending}`
    }
    static generateBackgroundImg() {
        let shouldHaveImg = this.getRandomNumber(1);
        return shouldHaveImg ? this.getRandomItem(backgroundImageURLs) : undefined;
    }
    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[this.getRandomNumber(letters.length-1)];
        }
        return color;
    }
      
    static getRandomNumber(max) {
        return Math.round(Math.random() * max);
    }

    static generatePhoneNumber() {
        let number=  '';
        while(number.length < 9) {
            number += this.getRandomNumber(9);
        }
        return number;
    }

    static getRandomItem(options) {
        let index = this.getRandomNumber(options.length-1);
        return options[index];
    }

    static sanitizeUserProvidedOptions(options) {
        if(!options.hasOwnProperty('contact')) options.contact = {};
        if(!options.contact.hasOwnProperty('phoneNumber')) options.contact.phoneNumber = {};
        if(!options.hasOwnProperty('background')) options.background = {};
        return options;
    }
 }
 