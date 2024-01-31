export default function decorate(block) {
  [...block.children].forEach((row) => {
    if (row.querySelector("picture")) {
      row.className = "profile-images";
    }
    row.className = "profile-details";
  });
}
