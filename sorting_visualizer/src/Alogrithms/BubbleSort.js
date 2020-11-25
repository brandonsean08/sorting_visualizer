export function sortBubble(data) {
    let dataArray = data.datasets[0].data;
    //Sort the array
    let sortedDataArray = dataArray.sort(function(a, b) {
        return a-b;
    })
    data.datasets[0].data = sortedDataArray;
    return data;
}