import { SECONDS, MINUTES } from '../symbols';

export class Meter {
  // 间隔时间
  // 默认 5 秒
  private tickTime = 5 * SECONDS

  // 时间周期
  // 默认 60 秒
  private timePeriod = 1 * MINUTES;

  // 定时器
  private interval: NodeJS.Timeout;

  // 计数器
  private count = 0;

  // 速率
  private rate = 0;

  // 平滑系数
  // 数值越小曲线越平滑
  private alpha = 0;

  /**
   * 创建统计项
   * 使用 EWMA 指数移动加权平均算法
   */
  constructor() {
    // 自动计算平滑系数
    this.alpha = 1 - Math.exp(-this.tickTime / this.timePeriod);
    this.interval = setInterval(() => {
      this.tick();
    }, this.tickTime);
    this.interval.unref();
  }

  /**
   * 标记
   * @param num 
   */
  public mark(num = 1) {
    this.count += num;
  }

  /**
   * 获取值
   */
  public getValue() {
    return Math.round(this.rate * 1 * SECONDS * 100) / 100;
  }

  /**
   * 计算周期速率
   */
  private tick() {
    const instantRate = this.count / this.tickTime;
    this.count = 0;
    this.rate += (this.alpha * (instantRate - this.rate));
  }
}