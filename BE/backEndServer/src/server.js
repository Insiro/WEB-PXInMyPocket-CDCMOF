import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import schedule from "node-schedule";
import router from "./routes/controller.js";
import db from "./models/Index.js";
import cors from "cors";

//cors settings value
const corsOptions = {
  credentials: true,
  origin: true,
  methods: "GET,HEAD,POST,DELETE",
  optionsSuccessStatus: 200,
  maxAge: 3600,
};

//매주 일요일마다 weelkly sale 초기화
schedule.scheduleJob("* * * * 0", function () {
  console.log("reset sales");
  db.Product.update(
    {
      weekly_sale: 0,
    },
    {
      where: { category: "snack" },
    }
  );
});
//매달 1일마다 monthly sale 초기화
schedule.scheduleJob("* * * 1 *", function () {
  console.log("reset sales");
  db.Product.update(
    {
      weekly_sale: 0,
    },
    {
      where: { category: "snack" },
    }
  );
});

const app = express();
//#region connet sequelize with db
const sequelize = db.sequelize;

sequelize.sync().then(() => {
  console.log(db.User);
});
//#endregion 데이터베이스 초기화
app.use(cors(corsOptions));
const __dirname = path.dirname(new URL(import.meta.url).pathname);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//router 파일의 컨트롤러로 넘김
app.use("/api", router);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404).send({ error: "404 not found" });
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), () => {
  console.log(`Express server listening on port ${app.get("port")}`);
});