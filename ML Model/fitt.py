
def fit(x_train, y_train):
    result = {}
    class_values = set(y_train)
    for curr in class_values:
        result[curr] = {}
        result["total_data"] = len(y_train)
        current_class_rows = (y_train == curr)
        x_train_current = x_train[current_class_rows]
        y_train_current = y_train[current_class_rows]

        feat_count = x_train.shape[1]  # (rows, cols)
        result[curr]["total_count"] = len(y_train_current)
        for j in range(1, feat_count + 1):
            result[curr][j] = {}
            all_possible_values = set(x_train[:, j - 1])
            for curr_value in all_possible_values:
                result[curr][j][curr_value] = (x_train_current[:, j - 1] == curr_value).sum()
    return result