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


function calculateCount() {
    total.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();

function availableJobsCount(){
    jobCount.innerText = allCardSection.children.length + ' jobs';
    
}
availableJobsCount();

function toggleStyle(id) {
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


}

mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText
        const jobTitle = parentNode.querySelector('.job-title').innerText
        const salaryRange = parentNode.querySelector('.salary-range').innerText
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

        calculateCount();

        if(currentStatus == 'rejected-filter-btn'){
            renderrejected();
        }
        
    }
    else if (event.target.classList.contains('rejected-btn')) {

        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.company-name').innerText
        const jobTitle = parentNode.querySelector('.job-title').innerText

        const salaryRange = parentNode.querySelector('.salary-range').innerText
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
            renderInterview()
        }

        calculateCount();
    }
})


function renderInterview() {
    filterSection.innerText = '';

    for (let interview of interviewList) {
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'bg-white rounded-lg p-6 shadow-[0 2px 4px rgba(0,0,0,0.05)] mb-4'
        div.innerHTML = `
        <div class="flex justify-between mb-1">
                    <div class="company-info">
                        <h2 class="company-name text-[#002C5C] font-bold text-xl">${interview.companyName}</h2>
                        <p class="job-title text-[#64748B] my-1 text-sm">React Native Developer</p>
                    </div>
                    <button class=" p-2 cursor-pointer">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>

                <div class="salary-range flex items-center gap-2 text-[#64748B] text-sm mb-5">
                    <span>Remote</span> • <span>Full-time</span> • <span>$130,000 - $175,000</span>
                </div>

                <div class="mb-6">
                    <h1
                        class="status bg-[#ebf4ff] inline-block px-2.5 py-3 rounded-sm font-semibold text-[#2b6cb0] text-sm mb-2">${interview.status}</h1>

                    <p class="description text-[#4a5568]">
                        Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.
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
        div.className = 'bg-white rounded-lg p-6 shadow-[0 2px 4px rgba(0,0,0,0.05)] mb-4'
        div.innerHTML = `
        <div class="flex justify-between mb-1">
                    <div class="company-info">
                        <h2 class="company-name text-[#002C5C] font-bold text-xl">${rejected.companyName}</h2>
                        <p class="job-title text-[#64748B] my-1 text-sm">React Native Developer</p>
                    </div>
                    <button class=" p-2 cursor-pointer">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>

                <div class="salary-range flex items-center gap-2 text-[#64748B] text-sm mb-5">
                    <span>Remote</span> • <span>Full-time</span> • <span>$130,000 - $175,000</span>
                </div>

                <div class="mb-6">
                    <h1
                        class="status bg-[#ebf4ff] inline-block px-2.5 py-3 rounded-sm font-semibold text-[#2b6cb0] text-sm mb-2">${rejected.status}</h1>

                    <p class="description text-[#4a5568]">
                        Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.
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