### **Question-1: What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?**

**1. getElementById:** It’s the most specific one. It only looks for a unique id. Since an ID should only be used once in a page, it returns just **one single element**.

**2. getElementsByClassName:** This one looks for all elements that have a specific class. Since multiple elements can share the same class, it returns an **HTMLCollection** (which is like an array, but not exactly an array).

**3. querySelector / querySelectorAll:** These are the most "modern" and flexible. You can use CSS-style selectors (like .class, #id, or div > p).
* **querySelector:** Returns only the **first** element it finds that matches the criteria.
* **querySelectorAll:** Returns a **NodeList** of all matching elements.

---

### **Question-2: How do you create and insert a new element into the DOM?**

To add something new to any webpage using JavaScript, we generally follow these steps:

1.  **Create the Element:** Use document.createElement('tagName'). At this point, the element exists in JavaScript's "memory," but it’s not visible on the screen yet.
    
2.  **Insert it into the DOM:** Once it's created, we need to tell it where to go. There are three main ways to do this:
    * **appendChild():** This puts the new element at the very end of a parent element.
    * **prepend():** This puts it at the very beginning of the parent.
    * **insertAdjacentHTML():** This is a bit more advanced and super fast. It lets us place new elements in the perfect spot within our HTML.

---

### **Question-3: What is Event Bubbling? And how does it work?**

**Definition:** Event bubbling in JavaScript is a mechanism where an event triggered on a child element propagates upward through its ancestors in the DOM. It allows parent elements to respond to events triggered by their child elements.

**How does it work?** Imagine you have a **button** inside a **div**, and that div is inside a **section**.
1. If you click the **button**, the click event first triggers on the button.
2. Then, it automatically moves up to the **div**.
3. After that, it moves up to the **section**.
4. Finally, it reaches the **window**.

---

### **Question-4: What is Event Delegation in JavaScript? Why is it useful?**

**Definition:** Event delegation is a technique in JavaScript where a single event listener is attached to a parent element instead of attaching event listeners to multiple child elements. When an event occurs on a child element, the event bubbles up the DOM tree, and the parent element's event listener handles the event based on the target element.

**Why is it useful?**
* **Improved performance:** Attaching a single event listener is more efficient than attaching multiple event listeners to individual elements, especially for large or dynamic lists. This reduces memory usage.
* **Dynamic element support:** Event delegation automatically handles events for dynamically added or removed elements within the parent element. There's no need to manually attach or remove event listeners when the DOM structure changes.

---

### **Question-5: What is the difference between preventDefault() and stopPropagation() methods?**

**1. preventDefault():** This method is used to stop the **default action** that the browser usually performs for a specific event. It doesn’t stop the event from moving up the DOM; it just tells the browser, "Don't do what you usually do here."
* **Common Use Case:** Form validation, preventing links from jumping.
* **Example:** Stopping a form from refreshing the page on submit, or stopping a link from opening a URL.

**2. stopPropagation():** This method is used to stop the **event bubbling** process. It prevents the event from "traveling up" to parent elements.
* **Common Use Case:** Nested buttons (like a delete button inside a clickable card).
* **Example:** If you have a delete button inside a clickable card, using this will ensure that clicking 'Delete' doesn't also trigger the 'Open Card' action on the parent div.
