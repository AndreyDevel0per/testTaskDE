import "../css/reset.scss";
import "../css/fonts.scss";
import "../css/vars.scss";
import "../css/palette.scss";
import "../css/global.scss";
import "../css/utils.scss";
import.meta.glob("../components/**/*.scss", { eager: true });
//не знаю как можно глобально импортировать стили из ../css,
//ведь их нужно подгружать в определенном порядке
