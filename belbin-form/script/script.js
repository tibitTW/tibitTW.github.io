var remaining_values = [10, 10, 10, 10, 10, 10, 10]

updateRemainingValue = () => {
    remaining_values = [10, 10, 10, 10, 10, 10, 10]
    for (var si = 1; si <= 7; si++) {
        for (var i = 1; i <= 8; i++) {
            var radios = document.forms['main-form'].elements[`q${si}_${i}`]
            remaining_values[si - 1] -= radios.value
        }
    }
    console.log({ remaining_values })
}

updateAvailableOptions = () => {
    for (var si = 1; si <= 7; si++) {
        for (var i = 1; i <= 8; i++) {
            var radios = document.forms['main-form'].elements[`q${si}_${i}`]

            var max_available_option = remaining_values[si - 1] + +radios.value
            for (var ri = 0, max = radios.length; ri < max; ri++) {
                if (ri <= max_available_option) {
                    radios[ri].disabled = false
                } else {
                    radios[ri].disabled = true
                }
            }
        }
    }
}

for (var si = 1; si <= 7; si++) {
    for (var i = 1; i <= 8; i++) {
        var radios = document.forms['main-form'].elements[`q${si}_${i}`]
        for (radio in radios) {
            radios[radio].onclick = function () {
                console.log(this.value)
                updateRemainingValue()
                updateAvailableOptions()
            }
        }
    }
}

checkForm = () => {
    console.log('LOG: running checkForm function')

    updateRemainingValue()

    var rtn_value = true
    var page_offsetX = null

    // check name
    var name_object = document.getElementById('name')
    if (!name_object.value.trim()) {
        rtn_value = false

        name_object.parentElement.classList.add('warning')
        name_object.focus()

        page_offsetX = page_offsetX == null ? name_object.parentElement.offsetTop : page_offsetX
    } else {
        name_object.parentElement.classList.remove('warning')
    }

    // check id
    var id_object = document.getElementById('id')
    if (!id_object.value.trim()) {
        rtn_value = false

        id_object.parentElement.classList.add('warning')
        id_object.focus()

        page_offsetX = page_offsetX == null ? id_object.parentElement.offsetTop : page_offsetX
    } else {
        id_object.parentElement.classList.remove('warning')
    }

    // check department
    var department_value = null
    for (var i = 0; i < 5; i++) {
        var department_object = document.getElementById(`department-${i}`)
        if (department_object.checked) {
            department_value = department_object.value
            break
        }
    }
    if (document.getElementById('department-others-radio').checked) {
        department_value = document.getElementById('department-others').value
    }
    if (!department_value) {
        rtn_value = false

        document.getElementById('department-others-radio').parentElement.parentElement.classList.add('warning')

        page_offsetX = page_offsetX == null ? document.getElementById('department-others-radio').parentElement.parentElement.offsetTop : page_offsetX
    } else {
        document.getElementById('department-others-radio').parentElement.parentElement.classList.remove('warning')
    }

    // check group
    var group_value = null
    var eng_ch_list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
    for (var i = 0; i < 10; i++) {
        var group_object = document.getElementById(`group-${eng_ch_list[i]}`)
        if (group_object.checked) {
            group_value = group_object.value
            break
        }
    }
    if (!group_value) {
        rtn_value = false

        document.getElementById('group-a').parentElement.parentElement.classList.add('warning')
        page_offsetX = page_offsetX == null ? document.getElementById('group-a').parentElement.parentElement.offsetTop : page_offsetX
    } else {
        document.getElementById('group-a').parentElement.parentElement.classList.remove('warning')
    }

    // check each question section
    var output_strs = []
    var number_ch_list = ['ㄧ', '二', '三', '四', '五', '六', '七']

    for (var si = 0; si < 7; si++) {
        if (remaining_values[si] != 0) {
            rtn_value = false

            output_strs.push(`第${number_ch_list[si]}大題尚餘 ${remaining_values[si]} 分`)
            document.getElementsByClassName('section')[si + 2].classList.add('warning')

            page_offsetX = page_offsetX == null ? document.getElementsByClassName('section')[si + 2].offsetTop : page_offsetX
        } else {
            document.getElementsByClassName('section')[si + 2].classList.remove('warning')
        }
    }
    if (remaining_values.reduce((a, b) => a + b, 0) != 0) {
        alert(output_strs.join('\n'))
    }

    // return value

    if (!rtn_value) {
        window.scrollTo({ top: page_offsetX - 30, behavior: 'smooth' })
    }

    return rtn_value
}

//
document.getElementById('department-others').addEventListener('focusout', (e) => {
    document.getElementById('department-others-radio').value = e.target.value
})
