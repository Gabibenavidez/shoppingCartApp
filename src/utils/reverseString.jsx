export function reverseString(str) {
    let arr = str.split('');
    let left = 0, right = arr.length - 1;
  
    // Iterate through the array using two pointers: left and right
    while (left < right) {
      // Skip non-letter characters from the left side
      if (!isLetter(arr[left])) {
        left++;
      }
      // Skip non-letter characters from the right side
      else if (!isLetter(arr[right])) {
        right--;
      }
      // If both characters are letters, swap them
      else {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
      }
    }
  
    // Convert the array back to a string and return it
    return arr.join('');
  }
  
  // Helper function to determine if a character is a letter (uppercase or lowercase)
  function isLetter(char) {
    return (/[a-zA-Z]/).test(char);
  }
  
  // Examples of usage:
  // console.log(reverseString("a,b$c"));
  // console.log(reverseString("Ab,c,de!$"));
  