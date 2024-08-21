# LeetCode 1342 - Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

Published on August 21, 2024

![Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold](https://cdn.sanity.io/images/ok7qsbpm/production/94d179e627398a707b611c4d741e4a5dcf95a57e-1692x1024.jpg?q=75&fit=clip&auto=format&fm=webp)

Last time we solved a typical [sliding window problem in O(k) time complexity](https://konadu.dev/maximum-points-you-can-obtain-from-cards-leetcode-1423), and people loved it, today too, let's take a look at another sliding window problem, and see what we can do. This is specifically [leetcode #1342](https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/description/).

## Problem

Given an array of integers `arr` and two integers k and threshold, return the number of sub-arrays of size k and average greater than or equal to threshold.

### Example 1:

Input: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4  
Output: 3  
Explanation: Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).

### Example 2:

Input: arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5  
Output: 6  
Explanation: The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.

### Constraints

1 <= arr.length <= 10^5  
1 <= arr[i] <= 10^4  
1 <= k <= arr.length  
0 <= threshold <= 10^4

## Intuition

My first thought about this was that it's a sliding window problem, and for sliding window problems, what I normally do is keep a subarray, where I will be doing [`arr.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) and [`arr.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) operations on the subarray, so that I can be adding and removing elements dynamically.  
But I later realized that the above approach will take up more memory, and will add more time complexity to the algorithm. Because for instance, the `array.shift()` method has a [complexity of O(N)](https://tms-outsource.com/blog/posts/javascript-array-shift-method/). Add that to the for loop we would be running, and we are already clocking `O(N^2)` runtime complexity, which in my opinion is a no-no for a sliding window technique.

## Approach

So to solve this problem with an algorithm, that's lesser than `O(N^2)`, I did this:

1. **Initial Sum Calculation**: First, we calculate the sum of the first subarray of size `k`, let's say `K` is `2`.
2. **Sliding the Window**: As we move forward in the array, I adjust the sum of the subarray by subtracting the element that is no longer in the subarray (the element that is `k` positions behind the current element, so basically `i-k`, so if `i` is `4` and `k` is `2`, we will have `4-2`, which is array index `2`, so we substract that value at that index from our sum of subarrays) and lastly we add the current element.
3. **Comparison**: After updating the sum, we check if the average of the current subarray (sum divided by `k`) is greater than or equal to the threshold. If it is, we increment the count.  
This approach ensures that we efficiently calculate the sum of each subarray in constant time after the initial sum calculation, resulting in an overall time complexity of `O(N)`.

## Complexity

* Time complexity  
We iterate through the array exactly once. This means that for an array of length `(N)`, we perform `(N)` iterations.
* Space complexity:  
The space complexity is `O(1)` because the space used by the algorithm does not depend on the size of the input array.

## Code

```undefined
function numOfSubarrays(arr: number[], k: number, threshold: number): number {
    let tresholdCount = 0; // Initialize the count of subarrays meeting the threshold
    let subArraySum = 0; // Initialize the sum of the current subarray

    for (let i = 0; i < arr.length; i++) {
        if (i < k) {
            // For the first k elements, calculate the initial sum
            subArraySum += arr[i];
            if (i === k - 1) {
                // Once we have the first subarray of size k, check if its average meets the threshold
                (subArraySum / k) >= threshold ? tresholdCount++ : null;
            }
        } else {
            // For subsequent elements, update the sum by removing the element that is no longer in the subarray
            subArraySum -= arr[i - k];
            // Add the current element to the sum
            subArraySum += arr[i];

            // Check if the new subarray's average meets the threshold
            (subArraySum / k) >= threshold ? tresholdCount++ : null;
        }
    }

    return tresholdCount; // Return the count of subarrays meeting the threshold
};

```