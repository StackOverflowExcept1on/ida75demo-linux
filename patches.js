var ida64 = Module.getBaseAddress("ida64");
var libida64 = Module.getBaseAddress("libida64.so");

var mprotect = function (ptr) {
    Memory.protect(ptr, Process.pageSize, 'rwx');
}

var patch = function (offset, buffer) {
    mprotect(offset);
    offset.writeByteArray(buffer);
}

/// Sorry, the evaluation version has expired
patch(ida64.add(0x0027FD64), [0x90, 0x90, 0x90, 0x90, 0x90, 0x90]);

/// Sorry, the demo version will not disassemble itself
patch(ida64.add(0x27C070), [0x90, 0x90, 0x90, 0x90, 0x90, 0x90]);
patch(libida64.add(0xBCD09), [0x90, 0x90, 0x90, 0x90, 0x90]);

/// Thank you for using the IDA debugger demo
patch(ida64.add(0x1ABBE8), [0x90, 0x90, 0x90, 0x90, 0x90, 0x90]);

recv("input", function (message) {
    /// Sorry, copying huge amounts to clipboard is disabled in the demo
    var hexx64 = Module.load(message.hexx64).base;

    patch(hexx64.add(0x2276B), [0x90, 0x90]); //annoying message
    patch(hexx64.add(0x22784), [0xeb]);

    send("done");
});
