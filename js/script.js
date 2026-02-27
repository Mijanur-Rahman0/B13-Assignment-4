let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

let jobCount = document.getElementById('jobCount');


const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interviewed-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const emptySection = document.getElementById('empty-section');


function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();
availableJobsCount();

function availableJobsCount(){
    let count = 0;
    let totalCount = allCardSection.children.length;
    jobCount.innerText = `${totalCount} jobs`; 
    
    if(currentStatus === 'interviewed-filter-btn'){
        count = interviewList.length;
        jobCount.innerText = `${count} of ${totalCount} jobs`;
    }
    else if(currentStatus === 'rejected-filter-btn'){
        count = rejectedList.length;
        jobCount.innerText = `${count} of ${totalCount} jobs`;
    }

}


function toggleStyle(id){
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

    allFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]');
    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-white', 'text-[#64748B]');
    selected.classList.add('bg-[#3B82F6]', 'text-white')


    if(id == 'interviewed-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }else if(id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderrejected();
    }
    checkEmpty();
    availableJobsCount();

}

function checkEmpty(){
    const allSectionVisible = !allCardSection.classList.contains('hidden');
    let currentCardsCount = 0;

    if(allSectionVisible){
        currentCardsCount = allCardSection.children.length;
    }
    else{
        currentCardsCount = filterSection.children.length;
    }

    if(currentCardsCount === 0){
        emptySection.classList.remove('hidden');
    }
    else{
        emptySection.classList.add('hidden');
    }
}

mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText
        const jobTitle = parentNode.querySelector('.jobTitle').innerText
        const salaryRange = parentNode.querySelector('.salaryRange').innerText
        const status = parentNode.querySelector('.status').innerText
        const description = parentNode.querySelector('.description').innerText
        
        parentNode.querySelector('.status').innerText = 'Interview';

        const cardInfo = {
            companyName,
            jobTitle,
            salaryRange,
            status:'Interview',
            description
        }

        const jobExsist = interviewList.find(item => item.companyName == cardInfo.companyName);

        if (!jobExsist) {
            interviewList.push(cardInfo)
        }

        rejectedList = rejectedList.filter(item => item.companyName != cardInfo.companyName);

        
        if(currentStatus == 'rejected-filter-btn'){
            renderrejected();
            checkEmpty();
        }
        
        calculateCount();
        checkEmpty();
        availableJobsCount();
    }
    else if (event.target.classList.contains('rejected-btn')) {

        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText
        const jobTitle = parentNode.querySelector('.jobTitle').innerText

        const salaryRange = parentNode.querySelector('.salaryRange').innerText
        const status = parentNode.querySelector('.status').innerText
        const description = parentNode.querySelector('.description').innerText
        
        parentNode.querySelector('.status').innerText = 'Rejected';

        const cardInfo = {
            companyName,
            jobTitle,
            salaryRange,
            status:'Rejected',
            description
        }

        const jobExsist = rejectedList.find(item => item.companyName == cardInfo.companyName);

        

        if (!jobExsist) {
            rejectedList.push(cardInfo)
        }

        interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName);

        if(currentStatus == 'interviewed-filter-btn'){
            renderInterview();
            checkEmpty();
        }

        calculateCount();
        checkEmpty();
        availableJobsCount();
    } 
    else if (event.target.classList.contains('delete-btn')) {
        const card = event.target.closest('.card');
        const companyName = card.querySelector('.company-name').innerText;

        card.remove();
        
        interviewList = interviewList.filter(item => item.companyName !== companyName);
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);
        
        const cardsInMain = Array.from(allCardSection.children);
        for(const mainCard of cardsInMain){
            if(mainCard.querySelector('.company-name').innerText === companyName){
                mainCard.remove();
            }
        }

        calculateCount();
        availableJobsCount();
        checkEmpty();
    }
})


function renderInterview() {
    filterSection.innerText = '';

    for (let interview of interviewList){
        let div = document.createElement('div');
        div.className = 'card bg-white rounded-lg p-6 shadow-[0 2px 4px rgba(0,0,0,0.05)] mb-4'
        div.innerHTML = `
            <div class="flex justify-between mb-1">
                    <div class="company-info">
                        <h2 class="company-name text-[#002C5C] font-bold text-xl">${interview['companyName']}</h2>
                        <p class="jobTitle text-[#64748B] my-1 text-sm">${interview['jobTitle']}</p>
                    </div>
                    <button class=" p-2 cursor-pointer delete-btn">
                        <i class="fa-regular fa-trash-can pointer-events-none"></i>
                    </button>
                </div>

                <div class="salaryRange text-[#64748B] text-sm mb-5">
                ${interview['salaryRange']}
                </div>

                <div class="mb-6">
                    <h1
                        class="status bg-[#ebf4ff] inline-block px-2.5 py-3 rounded-sm font-semibold text-[#2b6cb0] text-sm mb-2">
                        ${interview['status']}</h1>

                    <p class="description text-[#4a5568]">
                        ${interview['description']}
                    </p>
                </div>

                <div class="flex gap-3">
                    <button
                        class="interview-btn border border-[#10B981] text-[#10B981] py-2 px-3 rounded-sm font-semibold cursor-pointer">INTERVIEW</button>
                    <button
                        class="rejected-btn border border-[#EF4444] text-[#EF4444] py-2 px-3 rounded-sm font-semibold cursor-pointer">REJECTED</button>
                </div>


        `
        filterSection.appendChild(div);
    }
}

function renderrejected() {
    filterSection.innerText = '';

    for (let rejected of rejectedList) {

        let div = document.createElement('div');
        div.className = 'card bg-white rounded-lg p-6 shadow-[0 2px 4px rgba(0,0,0,0.05)] mb-4'
        div.innerHTML = `
        <div class="flex justify-between mb-1">
                    <div class="company-info">
                        <h2 class="company-name text-[#002C5C] font-bold text-xl">${rejected['companyName']}</h2>
                        <p class="jobTitle text-[#64748B] my-1 text-sm">${rejected['jobTitle']}</p>
                    </div>
                    <button class=" p-2 cursor-pointer delete-btn">
                        <i class="fa-regular fa-trash-can pointer-events-none"></i>
                    </button>
                </div>

                <div class="salaryRange text-[#64748B] text-sm mb-5">
                ${rejected['salaryRange']}
                </div>

                <div class="mb-6">
                    <h1
                        class="status bg-[#ebf4ff] inline-block px-2.5 py-3 rounded-sm font-semibold text-[#2b6cb0] text-sm mb-2">
                        ${rejected['status']}</h1>

                    <p class="description text-[#4a5568]">
                        ${rejected['description']}
                    </p>
                </div>

                <div class="flex gap-3">
                    <button
                        class="interview-btn border border-[#10B981] text-[#10B981] py-2 px-3 rounded-sm font-semibold cursor-pointer">INTERVIEW</button>
                    <button
                        class="rejected-btn border border-[#EF4444] text-[#EF4444] py-2 px-3 rounded-sm font-semibold cursor-pointer">REJECTED</button>
                </div>
        `
        filterSection.appendChild(div);
    }
}