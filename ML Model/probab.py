import imp


import numpy as np

def probability(dictionary, x, curr_class) :
    output = np.log(dictionary[curr_class]["total_count"]) - np.log(dictionary["total_data"])
    num_features = len(dictionary[curr_class].keys()) - 1 # due to "total_count" key
    for j in range(1, num_features+1) :
        xj = x[j-1]
        curr_class_with_value_xj = dictionary[curr_class][j][xj] + 1 # laplace correction
        count_curr_class = dictionary[curr_class]["total_count"] + len(dictionary[curr_class][j].keys())
        curr_xj_prob = np.log(curr_class_with_value_xj) - np.log(count_curr_class)
        output = output + curr_xj_prob
    return output