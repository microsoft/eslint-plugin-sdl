# Do not allocate uninitialized buffers in Node.js (no-unsafe-alloc)

When calling [`Buffer.allocUnsafe`](https://nodejs.org/api/buffer.html#buffer_static_method_buffer_allocunsafe_size) and [`Buffer.allocUnsafeSlow`](https://nodejs.org/api/buffer.html#buffer_static_method_buffer_allocunsafeslow_size), the allocated memory is not wiped-out and can contain old, potentially sensitive data.

These methods should be used only in justifiable cases (e.g. due to performance reasons) after thorough security review.

* [Rule Source](../../lib/rules/no-unsafe-alloc.js)
* [Rule Test](../../tests/lib/rules/no-unsafe-alloc.js)

## Resources

* [Node.js - What makes Buffer.allocUnsafe() and Buffer.allocUnsafeSlow() "unsafe"?](https://nodejs.org/api/buffer.html#buffer_what_makes_buffer_allocunsafe_and_buffer_allocunsafeslow_unsafe)
