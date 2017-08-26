window.deserialize = {
    /**
     * Deserialize a neural network
     * @param  {object} obj Object to create neural network from
     * @return {Network}    Resulting network
     */
    Network: (obj) => {
        let n = new Network([1]);
        n.values = obj.values;
        n.weights = obj.weights;
        
        return n;
    },
    /**
     * Deserialize a basic blob
     * @param  {object} obj Source object
     * @return {Network}    Resulting basic blob
     */
    BasicBlob: (obj) => {
        let bb = new BasicBlob(0, 0, 1);
        bb.x = obj.x;
        bb.y = obj.y;
        bb.size = obj.size;
        colorMode(obj.color.mode);
        bb.color = color(...obj.color._array);
        
        return bb;
    },
    /**
     * Deserialize a blob
     * @param  {object} obj Source object
     * @return {Network}    Resulting blob
     */
    Blob: (obj) => {
        let b = new Blob(0, 0, 1, null, {});
        
        b.x = obj.x;
        b.y = obj.y;
        b.size = obj.size;
        colorMode(obj.color.mode);
        b.color = color(...obj.color._array);
        
        b.network = window.deserialize.Network(obj.network);
        b.stillFrame = obj.stillFrame;
        b.stillX = obj.stillX;
        b.stillY = obj.stillY;
        b.viewRange = obj.viewRange;
        
        return b;
    }
};