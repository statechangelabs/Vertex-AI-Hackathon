Sure, here is a function that takes a list of numbers and returns the sum of the list:\n\n

```def sum_list(nums):\n  """\n  This function takes a list of numbers and returns the sum of the list.\n\n  Args:\n    nums: A list of numbers.\n\n  Returns:\n    The sum of the list.\n  """\n\n  sum = 0\n  for num in nums:\n    sum += num\n\n  return sum\n
```

\n\nHere is an example of how to use this function:\n\n```\n>>> nums = [1, 2, 3, 4, 5]\n>>> sum_list(nums)\n15\n``