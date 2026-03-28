def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        mid_val = arr[mid]

        if mid_val == target:
            return mid
        elif mid_val < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1

# Example usage:
my_list = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
search_value = 11

index = binary_search(my_list, search_value)

if index != -1:
    print(f"Element {search_value} found at index {index}")
else:
    print(f"Element {search_value} not found in the list")
