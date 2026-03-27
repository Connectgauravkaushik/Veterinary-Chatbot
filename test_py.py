
    def binary_search(arr, target):
        low = 0
        high = len(arr) - 1

        while low <= high:
            mid = (low + high) // 2
            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return -1  # Target not found

    # Example usage:
    my_list = [1, 3, 5, 7, 9, 11, 13, 15]
    search_value = 7
    index = binary_search(my_list, search_value)

    if index != -1:
        print(f"Target {search_value} found at index {index}")
    else:
        print(f"Target {search_value} not found in the list")
    