let val = 0;

function inpChange1() {
    let inp = document.getElementById('inp').value;
    if (inp === '') {
        alert('Please Enter Something');
    } else {
        let mainList = document.getElementById('dataList');
        let list = document.createElement('li');

        list.className = "items";
        list.addEventListener = "onclick";
        
        let currentVal = val;  
        val++;  

        list.id = `del${currentVal}`;
        
        list.innerHTML = `
            <div class="display">
                <div class="display">
                    <input type="checkbox" id="l${currentVal}" name="l${currentVal}" onchange="toggleLineThrough(this)">
                    <label for="l${currentVal}" class="display">${inp}</label>
                </div><span class="material-symbols-outlined" onclick="delMe(${currentVal})">close</span>
            </div>
            `;
        mainList.appendChild(list);
    }
}

function toggleLineThrough(checkbox) {

    let label = checkbox.nextElementSibling;

    if (checkbox.checked) {
        label.style.textDecoration = "line-through";
    } else {
        label.style.textDecoration = "none";
    }
}


function delMe(value) {
    let listData = document.getElementById(`del${value}`);

    console.log(listData);
    listData.remove();
}





























