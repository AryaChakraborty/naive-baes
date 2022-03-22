import probab

def predictSinglePoint(dictionary, x) :
    classes = dictionary.keys() # setosa, virgin.., versi, "total_data"
    best_prob = -1
    best_class = -1
    firstrun = True
    for curr_class in classes :
        if(curr_class == "total_data") :
            continue
        p_curr_class = probab.probability(dictionary, x, curr_class) # dictionary[curr_class]["total_count"]
        if(firstrun or p_curr_class > best_prob) :
            best_prob = p_curr_class
            best_class = curr_class
        firstrun = False
    return best_class