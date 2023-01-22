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
            console.log(i, max_available_option)
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
    return false
}
