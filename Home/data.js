/*-------------------------------------------------------------------------------*/

//cart started

const cartButton = document.querySelector("#cartButton"); // catiriq cart buttona catdiq
const cartItems = document.querySelector("#cart-Items"); // catiriq hemen butonun uzerindeki artib azalan reqeme

const cartContain = document.querySelector(".cart-container"); // umumi sebete catiriq
const productListComponentsParent = document.querySelector(".product-list-components-parent");

const productListComponents = document.querySelector(".product-list-components"); // catiriq saqdan acilan sebetin childlerine
const totalPriceValue = document.querySelector("#total-price-value"); // catiriq saqdan acilan sebetin icindeki axirdaki cem qiymeti hesablayan deyere
const clearProduct = document.querySelector("#clear-product"); // catiriq saqdan acilan sebetin icindeki clear silmek duymesine


const productsParentDom = document.querySelector(".products-parent-dom"); // catiriq section 1 e apilerin parentine
// const addPriceBtn = document.querySelector("#addPriceBtn"); // / catiriq saqdan acilan sebetin icindeki clear artir duymesine


// biz bezi seyleri siraya salmaqimiz lazimdir bunun ucun asyn awaitden ist edirik // basqalari ne var idi?

// sonra gedirik mock api ye with google uzerinden giris edirik yaradiriq ardicilliqla

// Sonra 3 clas yaradiriq
// 1-cisi products yeni api ile inteqrasya qurduqumuz yer; 
// 2-ci apiden aldiqlarimizi fronta UI hisseye kecirib istfadeciye gosterdiyimiz yer;
// 3-cu local storagede yaddasa verme yeri;

let cart = []; // productlari elave edecek bir array aciriq

let buttonsDom = []; // burda biz buttonlara catdiqdan sonra arrayi aciriq / // ama bunda ise elave et sil flan onlari edeceyik



// 1-cisi products yeni api ile inteqrasya qurduqumuz yer.

class Products {
    async getProducts() {  // Yeni asinxron calis deyirem
        try {
            let result = await fetch("https://65447c145a0b4b04436c6ae5.mockapi.io/ecommerce/1/products");    //cursoru fetchde saxlayanda promise dondurduyunu goruruk.
            // bu resolve donur ve biz bunu json formatinda calisdirmaliyiq.
            let data = await result.json();
            // let products = data;
            // console.log(data);
            return data;
            // sonra asaqiya acilanda ne olsun yerine 
            // sonra datanin gelib gelmediyini yoxlamaq ucun konsola veririk onu
            // console.log(data); //bunu yoxlayiriq returndan qabaq
        } catch (apierror) {
            console.log(apierror);
        }
    }
}






// 2-ci apiden aldiqlarimizi fronta UI hisseye kecirib istfadeciye gosterdiyimiz yer.

class UI {
    displayProducts(products) { // Meselen bu ne edir ? mehsullari siralayir
        // console.log(products); // once bunu gosterirem
        let result = "";
        products.forEach(item => { // sonra ise dinamik olaraq img name price ni cekirik
            result +=

                `
                    <div class="api-parent-card">
                        <img src="${item.image}" alt="photo-api">
                        <div class="api-child-footer">
                            <span id="api-product-name">${item.tittle}</span>
                            <span id="api-product-price">${item.price}</span>
                            <button class="btn-add-to-cart" data-id=${item.id}>
                                <ion-icon id="cartApiIcon" name="cart-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                        
                    
                ` }); // for eachin icinden cixiriq

        productsParentDom.innerHTML = result; // her donen elemani result a beraber et ve bu qeder UI a datadan gelenleri verdik.

    };

    // carddaki buttonlari baslayiriq islemeye

    getBagButtons() { // Meselen bu ne edir ? button  idlerine gore icine yazdiqimiz yerlerde tesir gosterir
        const buttons = [...document.querySelectorAll(".btn-add-to-cart")]; // burda split operatoru vasitesi ile buttonlarin hamina catdiq rahat yolla. ama biz buna adi cata bilmezdik ona gore array olmasi ucun bele catdiq buttonlara/ bunun icinde donme islemini edeceyik
        //    console.log(buttons);
        buttonsDom = buttons; // ama bunda ise elave et sil flan onlari edeceyik
        //    console.log(buttonsDom);
        buttons.forEach(button => {
            let id = button.dataset.id;
            // console.log(id);
            let inCart = cart.find(item => item.id === id); // kartin icindeki id bu id e beraberdirse onu in carta at
            if (inCart) { // eger incart true donerse yeni varsa
                button.setAttribute("disabled", "disabled"); //buttonun men terkibini deyisirem yeni deaktivlesdirirem
                button.opacity = ".3";

            } else {
                // eger cart in icerisinde yoxsa 
                button.addEventListener("click", event => {
                    event.target.disabled = true; // eger birdefede klik olunarsa onda icaze verme klik olmasina
                    event.target.style.opacity = ".3"; // ve rengi deyissin
                    event.target.style.cursor = "auto"; // ve cursoru ox edirik tezden
                    // get products from products

                    // Carta productlari elave etmek
                    let cartItem = { ...Storage.getProduct(id), amount: 1 }; // klik olunduqda klik etdiyimiz elementi tapdi
                    // console.log(cartItem);
                    // Sebete atma islemini baslayiriq
                    cart = [...cart, cartItem];  //deyirikki bu kartin icerisinde ne qeder item varsa sen onu al ve ona cart itemi elave et yeni her klik olunduqda birini elave et yeni hemise yenileme elave klik olunani icine at
                    // console.log(cart);
                    // indi ise bunu local storagede yaddasa vermeliyik
                    Storage.saveCart(cart);
                    // burda ise local storagede yaddasa verdikden sonra sebetin icinde artirib azalma funksiyasini duzeldeceyik
                    this.saveCartValues(cart); // yuxaridaki her elave olunan carti savecartValues adindaki carta gonder
                    // indi ise ui hissede sebet isaresine klik eden kimi icine elave edeceyik
                    this.addCartItem(cartItem); // yada salaq carItem ne idi her klik etdiyimiz buttondaki item idi / cart ise binlarin toplandiqi yerdir yuxarida var
                    /* burda ise cardlardaki buttona klik olunduqunda o sebeti klikle avtomatik acsin metodunu yaradiriq
                    this.showCart();*/
                });
            }
        });

    }

    saveCartValues(cart) { // her klik olunduqdaki kartida bura elave edeceyik
        let tempTotal = 0; // burda artib azalan reqemdir
        let itemsTotal = 0; // burda sebetin basindaki artib azalan reqemdir
        cart.map(item => {  // her bir elave etdiyimiz kartin icinde doneceyik
            tempTotal += item.price * item.amount; // her klik olunanda qiymeti sayina vuran alqoritmani yaziriq 
            itemsTotal += item.amount; // nece eded item varsa onu sebetin basina yazdiracaq.
        });
        totalPriceValue.innerText = parseFloat(tempTotal.toFixed(2)); //Burda umumi meblegin hesablandiqi yeri asaqida caqiririq sonra / Parse et yeni vergullu sayi ola biler yeni vergulden sonrakini alma deyirik       sef ola biler. 
        cartItems.innerText = itemsTotal;    // nece eded varsa o qeder bunun icine elave et deyeceyik.
    }

    addCartItem(item) {
        const li = document.createElement("li");
        li.classList.add("product-list-components");
        li.innerHTML =
            `
                <div class="product-list-components">
                    <div class="add-product-children-1">
                        <img src="${item.image}" id="productImage" alt="cart">
                        <div class="cart-constructor">
                            <span id="ProductName">${item.tittle}</span>
                            <span id="ProductPrice">${item.price} $</span>
                        </div>
                    </div>
                    <div class="add-product-children-1">
                        <ion-icon id="removePriceBtn" class="quantity-minus" name="remove-outline" data-id=${item.id}></ion-icon>
                        <span class="quantity">${item.amount}</span>
                        <ion-icon id="addPriceBtn" class="quantity-plus" name="add-outline" data-id=${item.id}></ion-icon>
                        <ion-icon id="productBin" class="cart-remove-btn" name="trash-bin-outline" data-id=${item.id}></ion-icon>
                    </div>
                </div>
                
            `;
            // burda ise deyirikki usaqlarina elave et deyeceyik.
            productListComponentsParent.appendChild(li);

    }
    /*
    showCart(){
        buttons.click(); // burda isedeyirikki ona klik olunduqda o biri buttonu tetikle
    }
    */
   setupApp(){ //yuklendiyi zaman yerinde saxlayir itirmir
        cart = Storage.getCart(); // bunu sebete dusenleri locala salmaq ucun yaziriq
        this.saveCartValues(cart); // eger bossa bosu gonder eger dolu mise dolunu gonder
        this.populateCart(cart); // yeni biz burda deyirikki locala save olur axi ordan cek bunu
   }
   
   // sen bu carti al addcartitem vara unun icindeki ui hissesine gonder

   populateCart(cart){ // cart iteme atir foreach kartdan aldiqlari itemleri 
    cart.forEach(item => this.addCartItem(item));
   }

   // burda ise duymelere - ya basanda azalt + vuranda coxald emeliyyatini edirik 

   cartLogic(){ // Bu butun karti silmeye yariyir
    clearProduct.addEventListener("click",()=>{
        this.clearCart(); // clearCart deye bir methodu isled/ ve asaqida o methodu baslayiriq islemeye
    });
    productListComponentsParent.addEventListener("click", event =>{
        // console.log(event.target); evvel yoxlayiriq gorek icindekilerin hamina klik olunduqda gosterir.
        if(event.target.classList.contains("cart-remove-btn")){
            let removeItem = event.target; // burda yeni meqsed bir bir hamina catmaqdir consolede gorunduyu kimi.
            let id = removeItem.dataset.id;
            // console.log(removeItem); // yoxlayiriq
            removeItem.parentElement.parentElement.parentElement.remove();
            this.removeItem(id);
        }else if(event.target.classList.contains("quantity-minus")){
            let lowerAmount = event.target; // burda yeni meqsed bir bir hamina catmaqdir consolede gorunduyu kimi.
            let id = lowerAmount.dataset.id;
            // console.log(lowerAmount); // yoxlayiriq
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount -1;
            if(tempItem.amount > 0 ){
                Storage.saveCart(cart);
                this.saveCartValues(cart);
                lowerAmount.nextElementSibling.innerText = tempItem.amount;
            }else{
                lowerAmount.parentElement.parentElement.parentElement.remove();
                this.removeItem(id);
            }
        }else if(event.target.classList.contains("quantity-plus")){
            let AddAmount = event.target; // burda yeni meqsed bir bir hamina catmaqdir consolede gorunduyu kimi.
            let id = AddAmount.dataset.id;
            // console.log(lowerAmount); // yoxlayiriq
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount +1;
            Storage.saveCart(cart);
            this.saveCartValues(cart);
            AddAmount.previousElementSibling.innerText = tempItem.amount;
        }

    })


   }

   clearCart(){ // buda eynen ui den silir
    // bizim cartimizin icindeki listedeki ne qeder items varsa mapla donecek ve onlarin id sini alacaq.
    let cartItems = cart.map(item => item.id);
    // bu kart itemsin icinde for eachla doneceyik
    cartItems.forEach(id => this.removeItem(id)); // her donduyu id ni 
    while(productListComponentsParent.children.length > 0){ // burda biz sil duymesine basanda silme islemini etdik  ama ondan qabaq locala verdik
        productListComponentsParent.removeChild(productListComponentsParent.children[0]); 
    }
   }

   removeItem(id){
    cart = cart.filter(item => item.id !== id); // eslesenlerin xaricindekilerini goster
    this.saveCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);

    button.disabled = false;
    button.style.opacity = "1";
   }

   getSingleButton(id){
    return buttonsDom.find(button => button.dataset.id === id);
   }

}






// 3-cu local storagede yaddasa verme yeri.

class Storage {
    static saveProducts(products) { // save product ac bunun icine butun itemleri at
        localStorage.setItem("api in local", JSON.stringify(products));
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("api in local")); // lokalda ne qeder varsa hamini parse edib donusdur jsondan js de ist olunan versiyaya cevirdik
        return products.find(product => product.id === id); //her donduyu id beraberdirse yuxaridaki buton qismindeki id lere 
    }

    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    // bu metodu bura yazdiqdan sonra onu caqirmaq lazimdir ve bunu asaqida displayproductun yaninda caqiririq

    static getCart(){
       return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []; // eger varsa sen localstoragedeki carti at ora yoxsa bos aray dondur. tenrari usulu. varsa carti parse et
    }
}; 





//Fianlda yuklendiyi zaman olan hadiseleri yazdiqim yer.

document.addEventListener("DOMContentLoaded", () => {

    const ui = new UI();

    const products = new Products();

    ui.setupApp(); // burda ui hisseye veririk guncellenende

    products.getProducts().then(products => {
        ui.displayProducts(products);
        Storage.saveProducts(products); // burda biz local sorage nin metodunu caqirdiq
    }).then(() => {
        ui.getBagButtons(); // burdaki then i add to buttonlarin hamina catandan sonra yaziriq

        ui.cartLogic(); // burda ise biz silinme islemini edib sonra bura yaziriq
    })                                          


});










//cart end



/*-------------------------------------------------------------------------------*/