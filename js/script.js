const searchButton = document.getElementById('searchButton');
const searchString = document.getElementById('searchString');
const phoneCardContainer = document.getElementById('phoneCardContainer');
const phoneDetailsModalLabel = document.getElementById('phoneDetailsModalLabel');
const phoneDetailsModalBody = document.getElementById('phoneDetailsModalBody');
const loader = document.getElementById('loader');

const loadPhoneData = async (searchString) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchString}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneData(data);
}
const loadDetails = async (phoneDetails) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneDetails}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data);
}

const noPhoneFound = (isStatus) => {
    if (isStatus) {
        document.getElementById('noPhone').classList.add('d-none');
    }
    else {
        document.getElementById('noPhone').classList.remove('d-none');
    }

}
const loading = (isLoading) => {
    if (isLoading) {
        loader.classList.remove('d-none');
    } else {
        loader.classList.add('d-none');
    }
}

const displayDetails = (phoneDetailsSpecification) => {

    phoneDetailsModalLabel.innerText = phoneDetailsSpecification.data.name;

    const modalBody = `
    <p> Storage : ${phoneDetailsSpecification.data.mainFeatures.storage ? phoneDetailsSpecification.data.mainFeatures.storage : 'No Spec Found'}  </p>
    <p> Display Size : ${phoneDetailsSpecification.data.mainFeatures.displaySize ? phoneDetailsSpecification.data.mainFeatures.displaySize : 'No Spec Found'}  </p>
    <p> Chipset : ${phoneDetailsSpecification.data.mainFeatures.chipSet ? phoneDetailsSpecification.data.mainFeatures.chipSet : 'No Spec Found'}  </p>
    <p> Memory : ${phoneDetailsSpecification.data.mainFeatures.memory ? phoneDetailsSpecification.data.mainFeatures.memory : 'No Spec Found'}  </p>
    <p> Sensors : ${phoneDetailsSpecification.data.mainFeatures.sensors ? phoneDetailsSpecification.data.mainFeatures.sensors.join(', ') : 'No Spec Found'}  </p>
    <p> Release Date : ${phoneDetailsSpecification.data.releaseDate ? phoneDetailsSpecification.data.releaseDate : 'No Spec Found'}  </p>
    <p> Brand : ${phoneDetailsSpecification.data.brand ? phoneDetailsSpecification.data.brand : 'No Spec Found'}  </p>
    <p> Wlan : ${phoneDetailsSpecification.data.others.WLAN ? phoneDetailsSpecification.data.others.WLAN : 'No Spec Found'}  </p>
    <p> Bluetooth : ${phoneDetailsSpecification.data.others.Bluetooth ? phoneDetailsSpecification.data.others.Bluetooth : 'No Spec Found'}  </p>
    <p> GPS : ${phoneDetailsSpecification.data.others.GPS ? phoneDetailsSpecification.data.others.GPS : 'No Spec Found'}  </p>
    <p> NFC : ${phoneDetailsSpecification.data.others.NFC ? phoneDetailsSpecification.data.others.NFC : 'No Spec Found'}  </p>
    <p> Radio : ${phoneDetailsSpecification.data.others.Radio ? phoneDetailsSpecification.data.others.Radio : 'No Spec Found'}  </p>
    <p> USB : ${phoneDetailsSpecification.data.others.USB ? phoneDetailsSpecification.data.others.USB : 'No Spec Found'}  </p>
    `
    phoneDetailsModalBody.innerHTML = modalBody;
}


const displayPhoneData = (phoneData) => {
    console.log(phoneData.status);
    if (phoneData.status) {
        noPhoneFound(phoneData.status);
        for (phone of phoneData.data) {
            const phoneCard = `
            <div class="col">
                    <div class="card p-2">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                                <button data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" class="btn btn-primary" onclick="loadDetails('${phone.slug}')">See Details</button>
                                </div>
                    </div>
                </div>
            
            `
            phoneCardContainer.innerHTML += phoneCard;
            loading(false);
        }
    } else {
        noPhoneFound(phoneData.status);
        phoneCardContainer.innerHTML = "";
        loading(false);
    }


}

searchButton.addEventListener('click', function () {
    loading(true);
    loadPhoneData(searchString.value);
    noPhoneFound(true);
})
// loadPhoneData('iphone');