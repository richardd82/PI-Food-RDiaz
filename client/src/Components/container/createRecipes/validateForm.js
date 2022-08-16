function validation(input) {
    var errors = {};
    // title
    var nameRegex = /^[a-z A-z]+$/g;
    if (!input.title) errors.title = "Can't be empty";
    else if (!nameRegex.test(input.title)) {
      errors.title = "Only Alphabetic Characters";
    }
    // // Image
    // var imgPattern = /(https?:\/\/.*\.(?:png|jpg))/i;
    // if (!input.image) errors.image = "Image link can't be blank";
    // else if (!imgPattern.test(input.image))
    //   errors.image = "Must be a image link";
    // // Score
    // if (!input.minHeight) errors.minHeight = "Min Height can't be blank";
    // else if (input.minHeight <= 0) errors.minHeight = "Must be above zero";
    // else if (input.maxHeight) {
    //   if (parseInt(input.minHeight) > parseInt(input.maxHeight))
    //     errors.minHeight = "Min Height can't be greater than Max Height";
    // }
    // if (!input.maxHeight) errors.maxHeight = "Max Height can't be blank";
    // else if (input.maxHeight <= 0) errors.maxHeight = "Must be above zero";
    // // Weight
    // if (!input.minWeight) errors.minWeight = "Min Weight can't be blank";
    // else if (input.minWeight <= 0) errors.minWeight = "Must be above zero";
    // else if (input.maxWeight) {
    //   if (parseInt(input.minWeight) > parseInt(input.maxWeight))
    //     errors.minWeight = "Min Weight can't be greater than Max Weight";
    // }
    // if (!input.maxWeight) errors.maxWeight = "Max Weight can't be blank";
    // else if (input.maxWeight <= 0) errors.maxWeight = "Must be above zero";
    // // Life Span
    // if (!input.minLifeSpan) errors.minLifeSpan = "Min LifeSpan can't be blank";
    // else if (input.minLifeSpan <= 0) errors.minLifeSpan = "Must be above zero";
    // else if (input.maxLifeSpan) {
    //   if (parseInt(input.minLifemaxLifeSpan) > parseInt(input.maxLifeSpan))
    //     errors.minLifeSpan =
    //       "Min Life Span can't be greater than Max Life Span";
    // }
    // if (!input.maxLifeSpan) errors.maxLifeSpan = "Max LifeSpan can't be blank";
    // else if (input.maxLifeSpan <= 0) errors.maxLifeSpan = "Must be above zero";
    return errors;
  }