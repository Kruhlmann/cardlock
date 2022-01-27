# Maintainer: Andreas Kruhlmann <andreas@kruhlmann.dev>

pkgname=cardlock
pkgver=1.0.0
pkgrel=1
pkgdesc="Automatic PC locking with smart card"
url="https://github.com/kruhlmann/cardlock"
license=("GPL")
arch=("any")
depends=("nodejs")
makedepends=("pnpm")
source=("https://registry.npmjs.org/${pkgname}/-/${pkgname}-${pkgver}.tgz")
noextract=("${pkgname}-${pkgver}.tgz")
sha256sums=('9ad712a395b1fc845a2306b61632f247c50cea1f5c54c494f7c3d5725365c714')

prepare() {
  tar xf "${pkgname}-${pkgver}.tgz" package/LICENSE
}

package() {
  pnpm install -g --cache "${srcdir}/npm-cache" --prefix "$pkgdir/usr" "$srcdir/$pkgname-$pkgver.tgz"
  install -Dm644 package/LICENSE "$pkgdir/usr/share/licenses/$pkgname/LICENSE"
}
